'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Math', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English',
      'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Latin', 'History', 'Politics', 'Ethics',
      'Social Studies', 'Philosophy', 'Economics', 'Physical Education', 'Music', 'Art'],
    required: 'Subject must have a name!'
  },
}, {
  _id: false
});