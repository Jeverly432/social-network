const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password, userName } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const userRole = await Role.findOne({ value: 'USER' });

      if (!userRole) {
        return res.status(500).json({ message: 'Role USER not found. Please create it first.' });
      }

      const user = new User({
        email,
        password: hashedPassword,
        userName,
        role: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'User registered successfully' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User with this email not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = generateAccessToken(user._id, user.role);
      return res.json({ token });
    } catch (e) {
      console.log('Login error:', e);
      res.status(500).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Get users error' });
    }
  }
}

module.exports = new AuthController();
