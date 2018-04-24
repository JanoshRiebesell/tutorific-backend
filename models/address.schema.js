'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  street: {
    type: String,
    required: 'An address must have a street name!'
  },
  number: {
    type: String,
    required: 'An address must have a number!'
  },
  city: {
    type: String,
    required: 'An address must have a city!'
  },
  zip: {
    type: String,
    required: 'An address must have a zip!'
  },
  state: String,
  country: {
    type: String,
    required: 'An address must have a country!'
  }
}, {
  _id: false
});