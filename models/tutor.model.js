'use strict';

const mongoose = require('mongoose');
const person = require('./person.schema');

const TutorSchema = new mongoose.Schema({
  ...person,
  userType: {
    type: String,
    enum: 'tutor',
    default: 'tutor'
  },
  fieldOfStudy: String,
  semester: {
    type: Number,
    min: 1,
    max: 50
  },
  minStudentGrade: {
    type: Number,
    default: 1,
    min: 1,
    max: 13
  },
  maxStudentGrade: {
    type: Number,
    default: 13,
    min: 1,
    max: 13
  },
}, {timestamps: true});

module.exports = mongoose.model('Tutor', TutorSchema);