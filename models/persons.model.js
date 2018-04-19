'use strict';

const validator = require('validator');

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
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [(num) => {validator.isMobilePhone(num, 'any')}, 'Invalid phone number!']
  },
  address: {
    type: String,
    required: 'A person must provide an address or city district.'
  },
  status: {
    type: String,
    enum: ['registered', 'active', 'inactive', 'deleted'],
    default: 'registered'
  },
  birthday: Date,
  birthplace: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  }
}