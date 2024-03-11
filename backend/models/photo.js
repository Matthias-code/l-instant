// models/photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
    },
  ],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
