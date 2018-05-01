'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const Location = require('./location.schema');
const subject = require('./subject.schema');

module.exports = {
  firstname: {
    type: String,
    required: 'A person must provide a firstname!',
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: 'A person must provide a lastname!',
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: 'A person must provide an email!',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email!']
  },
  passwordHash: {
    type: String,
    required: 'A person must provide a password!',
    minlength: 6
  },
  token: String,
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [num => {validator.isMobilePhone(num, 'any')}, 'Invalid phone number!']
  },
  location: {
    type: Location,
    index: '2dsphere',
  },
  subjects: {
    type: [subject],
    validate: [subjects => subjects.length > 0, 'A person must have at least one subject!']
  },
  status: {
    type: String,
    enum: ['available', 'connected', 'inactive', 'deleted'],
    default: 'available'
  },
  birthday: Date,
  birthplace: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  connections: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Connection',
  }],
  userType: {
    type: String,
    enum: ['student', 'tutor'],
    required: 'A person must have a type of either student or tutor!'
  },
}