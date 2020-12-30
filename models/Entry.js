const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  meals: [String],
  stretch: {
    type: Boolean,
    default: false
  },
  bowel: {
    type: Boolean,
    default: false
  },
  cycle: String,
  pain: {
    type: Boolean,
    default: false
  },
  painLocation: String,
  painScale: Number
});

module.exports = mongoose.model('Entry', EntrySchema);
