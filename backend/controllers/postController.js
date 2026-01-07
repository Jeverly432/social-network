const User = require('../models/User');
const Post = require('../models/Post');
const Community = require('../models/Community');

class PostController {
  async createPost(req, res) {
    try {
      const userId = req.user.id;
      const { content, images, communityId } = req.body;
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!content) {
        return res.status(500).json({ message: 'Content is empty' });
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
        content: content,
        images: images || [],
        author: userId,
        community: communityId || null,
        type: communityId ? 'community' : 'user',
        likes: [],
        likesCount: 0,
        commentsCount: 0,
      });

      await post.save();

      await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });
      if (community) {
        await Community.findByIdAndUpdate(communityId, { $inc: { postsCount: 1 } });
      }

      const createdPost = await Post.findById(post._id)
        .populate('author', 'userName avatar')
        .populate('community', 'name avatar');

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
        .populate('community', 'name avatar');

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get post error' });
    }
  }
}

module.exports = new PostController();
