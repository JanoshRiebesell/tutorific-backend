'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const Address = require('./address.schema');
const Subject = require('./subject.schema');

module.exports = {
  firstName: {
    type: String,
    required: 'A person must provide a first name!',
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: 'A person must provide a last name!',
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
  address: {
    type: Address,
    index: '2dsphere',
  },
  subjects: {
    type: [Subject],
    validate: [subjects => subjects.length > 0, 'A person must have at least one subject!']
  },
  status: {
    type: String,
    enum: ['available', 'connected', 'inactive', 'deleted'],
    default: 'available'
  },
  birthDate: Date,
  birthPlace: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
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