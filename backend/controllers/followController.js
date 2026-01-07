const Follow = require('../models/Follow');
const User = require('../models/User');

class FollowController {
  async followUser(req, res) {
    try {
      const { userName } = req.params;
      const followerId = req.user.id;

      const userToFollow = await User.findOne({ userName: userName });
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
      }

      const currentUser = await User.findById(followerId);
      if (!currentUser) {
        return res.status(404).json({ message: 'Current user not found' });
      }

      if (currentUser.userName === userName) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
      }

      const existingFollow = await Follow.findOne({
        follower: followerId,
        following: userToFollow._id,
      });

      if (existingFollow) {
        return res.status(400).json({ message: 'You are already following this user' });
      }

      let status = 'accepted';
      let message = 'Successfully followed';

      if (userToFollow.isPrivate) {
        status = 'pending';
        message = 'Follow request sent';
      }

      const follow = new Follow({
        follower: followerId,
        following: userToFollow._id,
        status: status,
      });

      await follow.save();

      await User.findByIdAndUpdate(followerId, { $inc: { followingCount: 1 } });
      await User.findByIdAndUpdate(userToFollow._id, {
        $inc: { followersCount: 1 },
      });

      return res.json({
        message: message,
        follow: follow,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Follow user error' });
    }
  }

  async unfollowUser(req, res) {
    try {
      const { userName } = req.params;
      const followerId = req.user.id;

      const userToFollow = await User.findOne({ userName: userName });
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
      }

      const existingFollow = await Follow.findOne({
        follower: followerId,
        following: userToFollow._id,
      });

      if (!existingFollow) {
        return res.status(400).json({ message: 'You are not following this user' });
      }

      await existingFollow.deleteOne();

      await User.findByIdAndUpdate(followerId, {
        $inc: { followingCount: -1 },
      });

      await User.findByIdAndUpdate(userToFollow._id, {
        $inc: { followersCount: -1 },
      });

      return res.json({
        message: 'Successfully unfollowed',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Unfollow user error' });
    }
  }

  async getFollowers(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({ userName: userName });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const follows = await Follow.find({
        following: user._id,
        status: 'accepted',
      })
        .populate('follower', 'userName avatar followersCount followingCount')
        .select('follower createdAt')
        .sort({ createdAt: -1 });

      const followers = follows.map((follow) => ({
        user: follow.follower,
        followedAt: follow.createdAt,
      }));

      return res.json({
        followers: followers,
        total: followers.length,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get followers error' });
    }
  }

  async getFollowing(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({ userName: userName });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const follows = await Follow.find({
        follower: user._id,
        status: 'accepted',
      })
        .populate('following', 'userName avatar followersCount followingCount')
        .select('following createdAt')
        .sort({ createdAt: -1 });
        
      const following = follows.map((follow) => ({
        user: follow.following,
        followedAt: follow.createdAt,
      }));

      return res.json({
        following: following,
        total: following.length,
      });
      
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get following error' });
    }
  }
}

module.exports = new FollowController();
