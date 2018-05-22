'use strict';

module.exports = {
  type: String,
  enum: ['Math', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'Spanish', 'French', 'German', 'Italian', 'Chinese',
    'Japanese', 'Latin', 'History', 'Politics', 'Ethics', 'Social Studies',
    'Philosophy', 'Economics', 'Physical Education', 'Music', 'Art'],
  required: 'A subject must have a name!',
};