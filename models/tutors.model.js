'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const person = require('./persons.model');
const Subject = require('./subjects.model');

const TutorSchema = new mongoose.Schema({
  ...person,
  subjects: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Subject'
  },
  fieldOfStudy: String,
  semester: {
    type: Number,
    min: 1,
    max: 50
  }
}, {timestamps: true});

module.exports = mongoose.model('Tutor', TutorSchema);