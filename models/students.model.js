'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const person = require('./persons.model');
const Subject = require('./subjects.model');

const StudentSchema = new mongoose.Schema({
  ...person,
  subjects: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Subject'
  },
  schoolType: {
    type: String,
    enum: ['elementary', 'middle', 'high', 'special needs', 'vocational', 'refugee'],
    required: 'A student must provide his/her type of school!'
  },
  grade: {
    type: Number,
    required: 'A student must provide a grade level!',
    min: 1,
    max: 13
  }
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);