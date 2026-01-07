const { Schema, model } = require('mongoose');

const Post = new Schema(
  {
    content: { type: String, required: true },
    images: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    community: { type: Schema.Types.ObjectId, ref: 'Community', required: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    type: { type: String, enum: ['user', 'community'], default: 'user' },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Post', Post)
