'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const Subject = require('./subjects.model');
const Student = require('./students.model');
const Tutor = require('./tutors.model');

const ConnectionsSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: 'Connection must have a student!'
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tutor',
    required: 'Connection must have a tutor!'
  },
  subjects: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Subject'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive', 'concluded', 'deleted'],
    default: 'pending'
  },
}, {timestamps: true});

module.exports = mongoose.model('Connections', ConnectionsSchema);