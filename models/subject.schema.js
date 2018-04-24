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
  grades: {
    type: [{
      type: Number,
      min: 1,
      max: 13
    }],
    validate: [grades => grades.length > 0, 'A subject must have at least one grade!'],
    validate: [grades => grades.length < 3, 'A subject can have at most 2 grades!']
  }
}, {
  _id: false
});