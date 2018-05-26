'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  street: {
    type: String,
    required: 'An address must have a street!'
  },
  streetNumber: {
    type: String,
    required: 'An address must have a street number!'
  },
  zipCode: {
    type: String,
    required: 'An address must have a zip code!'
  },
  city: {
    type: String,
    required: 'An address must have a city!'
  },
  country: {
    type: String,
    required: 'An address must have a city!'
  },
  placeId: {
    type: String,
    required: 'An address must have a Google Maps place ID!'
  },
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    validate: [coordinates => coordinates.length === 2,
      'Coordinates must consist of exactly two numbers: longitude and latitude in this order!']
  },
}, {
  _id: false
});