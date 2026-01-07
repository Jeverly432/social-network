const { Schema, model } = require('mongoose');

const Follow = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'accepted' },
  },
  {
    timestamps: true,
  },
);

Follow.index({ follower: 1, following: 1 }, { unique: true });

Follow.index({ follower: 1 });
Follow.index({ following: 1 });
Follow.index({ status: 1 });

module.exports = model('Follow', Follow);
