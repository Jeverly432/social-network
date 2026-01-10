const Community = require('../models/Community');
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');

function createSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

class CommunityController {
  async createCommunity(req, res) {
    try {
      const userId = req.user.id;
      const { name, description, isPublic, coverImage, avatar, tags, verification } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Community name is required' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let slug = createSlug(name);

      let existingCommunity = await Community.findOne({ slug: slug });
      let counter = 1;

      while (existingCommunity) {
        slug = `${createSlug(name)}-${counter}`;
        existingCommunity = await Community.findOne({ slug: slug });
        counter++;
      }

      const community = new Community({
        verification: verification || false,
        tags: Array.isArray(tags) ? tags.filter(tag => tag && tag.trim()) : [],
        name: name.trim(),
        slug: slug,
        description: description || '',
        avatar: avatar || '',
        coverImage: coverImage || '',
        isPublic: isPublic !== undefined ? isPublic : true,
        creator: userId,
        admins: [userId],
        members: [userId],
        membersCount: 1,
        postsCount: 0,
      });

      await community.save();

      const createdCommunity = await Community.findById(community._id)
        .populate('creator', 'userName avatar')
        .populate('admins', 'userName avatar')
        .populate('members', 'userName avatar');

      return res.json(createdCommunity);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Create community error' });
    }
  }

  async getCommunity(req, res) {
    try {
      const { id } = req.params;

      const isObjectId = mongoose.Types.ObjectId.isValid(id);

      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const community = await Community.findOne(query)
        .populate('creator', 'userName avatar')
        .populate('admins', 'userName avatar')
        .populate('members', 'userName avatar');

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      return res.json(community);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get community error' });
    }
  }

  async getMyCommunities(req, res) {
    try {
      const userId = req.user.id;

      const communities = await Community.find({
        $or: [{ members: userId }, { admins: userId }],
      })
        .populate('creator', 'userName avatar')
        .sort({ createdAt: -1 });

      return res.json({
        communities: communities,
        total: communities.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get my communities error' });
    }
  }

  async getAllCommunities(req, res) {
    try {
      const communities = await Community.find({
        isPublic: true,
      })
        .populate('creator', 'userName avatar')
        .sort({ membersCount: -1 });

      return res.json({
        communities: communities,
        total: communities.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get all communities error' });
    }
  }

  async joinCommunity(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const isObjectId = mongoose.Types.ObjectId.isValid(id);

      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const community = await Community.findOne(query);

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      const isMember = community.members.some((memberId) => memberId.toString() === userId.toString());
      const isAdmin = community.admins.some((adminId) => adminId.toString() === userId.toString());

      if (isMember || isAdmin) {
        return res.status(400).json({ message: 'You are already a member of this community' });
      }

      community.members.push(userId);
      community.membersCount += 1;

      await community.save();

      const updatedCommunity = await Community.findById(community._id)
        .populate('creator', 'userName avatar')
        .populate('admins', 'userName avatar')
        .populate('members', 'userName avatar');

      return res.json(updatedCommunity);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Join community error' });
    }
  }

  async leaveCommunity(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const community = await Community.findOne(query);

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      if (community.creator.toString() === userId.toString()) {
        return res.status(400).json({ message: 'Community creator cannot leave the community' });
      }

      const isMember = community.members.some((memberId) => memberId.toString() === userId.toString());
      const isAdmin = community.admins.some((adminId) => adminId.toString() === userId.toString());

      if (!isMember && !isAdmin) {
        return res.status(400).json({ message: 'You are not a member of this community' });
      }

      community.members = community.members.filter((memberId) => memberId.toString() !== userId.toString());

      community.admins = community.admins.filter((adminId) => adminId.toString() !== userId.toString());

      community.membersCount -= 1;

      await community.save();

      const updatedCommunity = await Community.findById(community._id)
        .populate('creator', 'userName avatar')
        .populate('admins', 'userName avatar')
        .populate('members', 'userName avatar');

      return res.json(updatedCommunity);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Exit community error' });
    }
  }

  async getCommunityMembers(req, res) {
    try {
      const { id } = req.params;

      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const community = await Community.findOne(query)
        .populate('members', 'userName avatar email about')
        .populate('admins', 'userName avatar email about');

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      return res.json({
        members: community.members,
        admins: community.admins,
        total: community.membersCount,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get community members error' });
    }
  }

  async getPostsCommunities(req, res) {
    try {
      const { id } = req.params;

      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const community = await Community.findOne(query);

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      const posts = await Post.find({
        community: community._id,
        type: 'community',
      })
        .populate('author', 'userName avatar')
        .populate('community', 'name slug avatar')
        .sort({ createdAt: -1 });

      return res.json({
        posts: posts,
        total: posts.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get posts of community error' });
    }
  }
}

module.exports = new CommunityController();
