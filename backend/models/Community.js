const { Schema, model } = require('mongoose');

const Community = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    avatar: { type: String, required: false },
    coverImage: { type: String, required: false },
    isPublic: { type: Boolean, default: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    membersCount: { type: Number, default: 0 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    postsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

Community.index({ name: 1 });
Community.index({ creator: 1 });
Community.index({ members: 1 });
Community.index({ admins: 1 });

module.exports = model('Community', Community);
