const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
