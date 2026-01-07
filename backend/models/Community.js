const { Schema, model } = require('mongoose');

const Community = new Schema({
  name: String,
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  membersCount: Number,
});

module.exports = model('Community', Community);
