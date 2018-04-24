'use strict';

const validator = require('validator');

const Address = require('./address.schema');
const Subject = require('./subject.schema');

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
  password: {
    type: String,
    required: 'A person must provide a password!',
    minlength: 6
  },
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [(num) => {validator.isMobilePhone(num, 'any')}, 'Invalid phone number!']
  },
  address: {
    type: Address,
    required: 'A person must provide an address or city district.'
  },
  subjects: {
    type: [Subject],
    validate: [subjects => subjects.length > 0, 'A connection must have at least one subject!']
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