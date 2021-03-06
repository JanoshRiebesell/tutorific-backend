'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const subject = require('./subject.schema');

const ConnectionsSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: 'A connection must have a student!'
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tutor',
    required: 'A connection must have a tutor!'
  },
  subjects: {
    type: [subject],
    validate: [subjects => subjects.length > 0, 'A connection must have at least one subject!']
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive', 'concluded', 'deleted'],
    default: 'pending'
  },
}, {timestamps: true});

module.exports = mongoose.model('Connections', ConnectionsSchema);