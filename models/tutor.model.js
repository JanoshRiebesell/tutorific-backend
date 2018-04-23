'use strict';

const mongoose = require('mongoose');
const person = require('./person.schema');

const TutorSchema = new mongoose.Schema({
  ...person,
  fieldOfStudy: String,
  semester: {
    type: Number,
    min: 1,
    max: 50
  }
}, {timestamps: true});

module.exports = mongoose.model('Tutor', TutorSchema);