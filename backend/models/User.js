const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    avatar: { type: String, required: false },
    about: { type: String, required: false },
    isPrivate: { type: Boolean, default: false },
    role: [{ type: String, ref: 'Role' }],
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

module.exports = model('User', User);
