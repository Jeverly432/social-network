const User = require('../models/User');
const Post = require('../models/Post');
const Community = require('../models/Community');
const Follow = require('../models/Follow');

class PostController {
  async createPost(req, res) {
    try {
      const userId = req.user.id;
      const { title, communityId, description, images } = req.body;
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!title) {
        return res.status(500).json({ message: 'Title is empty' });
      }

      if (!description) {
        return res.status(500).json({ message: 'Description is empty' });
      }

      let postType = 'user';
      let community = null;

      if (communityId) {
        community = await Community.findById(communityId);

        if (!community) {
          return res.status(403).json({ message: 'Community not found' });
        }

        const isAdmin = community.admins.some((adminId) => adminId.toString() === userId.toString());

        if (!isAdmin) {
          return res.status(403).json({
            message: 'Only community admins can create posts',
          });
        }

        postType = 'community';
      }

      const post = new Post({
        title: title,
        description: description,
        images: images || [],
        author: userId,
        community: communityId || null,
        type: postType,
        likes: [],
        likesCount: 0,
        commentsCount: 0,
      });

      await post.save();

      await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });

      if (community) {
        await Community.findByIdAndUpdate(communityId, {
          $inc: { postsCount: 1 },
          $push: { posts: post._id },
        });
      }

      const createdPost = await Post.findById(post._id)
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar coverImage');

      return res.json(createdPost);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Create post error' });
    }
  }

  async getPost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findById(id)
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar coverImage');

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get post error' });
    }
  }

  async getPosts(req, res) {
    try {
      const userId = req.user.id;

      const follows = await Follow.find({
        follower: userId,
        status: 'accepted',
      });

      const followingIDs = follows.map((follow) => follow.following);

      followingIDs.push(userId);

      const communities = await Community.find({
        $or: [{ members: userId }, { admins: userId }],
      });

      const communityIds = communities.map((comm) => comm._id);

      const posts = await Post.find({
        $or: [
          { author: { $in: followingIDs }, type: 'user' },
          { community: { $in: communityIds }, type: 'community' },
        ],
      })
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar coverImage')
        .sort({ createdAt: -1 });

      return res.json({
        posts: posts,
        total: posts.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get posts error' });
    }
  }

  async getUserPosts(req, res) {
    try {
      const { userName } = req.params;

      const user = await User.findOne({ userName: userName });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const posts = await Post.find({
        author: user._id,
        type: 'user',
      })
        .populate('author', 'userName avatar')
        .sort({ createdAt: -1 });

      return res.json({
        posts: posts,
        total: posts.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get user posts error' });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You can only delete your own posts' });
      }

      await post.deleteOne();
      await User.findByIdAndUpdate(userId, { $inc: { postsCount: -1 } });

      if (post.community) {
        await Community.findByIdAndUpdate(post.community, {
          $inc: { postsCount: -1 },
          $pull: { posts: post._id },
        });
      }

      return res.json({
        message: 'Post deleted successfully',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Delete post error' });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, images } = req.body;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'You can only update your own posts' });
      }

      if (title !== undefined) post.title = title;
      if (images !== undefined) post.images = images;

      await post.save();

      const updatedPost = await Post.findById(id)
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar coverImage');

      return res.json(updatedPost);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Update post error' });
    }
  }

  async likePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const hasLiked = post.likes.some(
        (likeId) => likeId.toString() === userId.toString()
      );

      if (hasLiked) {
        await Post.findByIdAndUpdate(id, {
          $pull: { likes: userId },
          $inc: { likesCount: -1 },
        });
      } else {
        await Post.findByIdAndUpdate(id, {
          $push: { likes: userId },
          $inc: { likesCount: 1 },
        });
      }

      const updatedPost = await Post.findById(id)
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar coverImage');

      return res.json(updatedPost);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Like post error' });
    }
  }
}

module.exports = new PostController();
