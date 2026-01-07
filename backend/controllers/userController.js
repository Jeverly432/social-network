const User = require('../models/User');

class UserController {
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get current user error' });
    }
  }

  async deleteCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.deleteOne();

      return res.json({
        message: 'User deleted successfully',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Delete current user error' });
    }
  }

  async getUser(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({ userName: userName }).select('-password -_id');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get user error' });
    }
  }

  async updateCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const { userName, isPrivate, avatar, about } = req.body;
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (userName !== undefined) currentUser.userName = userName;
      if (about !== undefined) currentUser.about = about;
      if (isPrivate !== undefined) currentUser.isPrivate = isPrivate;
      if (avatar !== undefined) currentUser.avatar = avatar;

      await currentUser.save();

      const updatedUser = await User.findById(userId).select('-password');

      return res.json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Update current user error' });
    }
  }
}

module.exports = new UserController();
