'use strict';

const mongoose = require('mongoose');
const person = require('./person.schema');

const StudentSchema = new mongoose.Schema({
  ...person,
  userType: {
    type: String,
    enum: 'student',
    default: 'student'
  },
  schoolType: {
    type: String,
    enum: ['Elementary', 'Middle', 'High', 'Special Needs', 'Vocational', 'Refugee'],
    required: 'A student must provide his/her type of school!'
  },
  grade: {
    type: Number,
    required: 'A student must provide a grade level!',
    min: 1,
    max: 13
  },
  youthOrganization: String
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);