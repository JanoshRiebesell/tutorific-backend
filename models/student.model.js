'use strict';

const mongoose = require('mongoose');
const person = require('./person.schema');

const StudentSchema = new mongoose.Schema({
  ...person,
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
  },
  youthOrganization: String
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);