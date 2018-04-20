'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const person = require('./persons.model');
const Subject = require('./subjects.model');

const TutorSchema = new mongoose.Schema({
  ...person,
  subjects: {
    type: [Subject],
    validate: [subjects => subjects.length > 0, 'A connection must have at least one subject!']
  },
  fieldOfStudy: String,
  semester: {
    type: Number,
    min: 1,
    max: 50
  }
}, {timestamps: true});

module.exports = mongoose.model('Tutor', TutorSchema);