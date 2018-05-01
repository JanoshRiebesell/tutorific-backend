'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  label: {
    type: String,
    required: 'An address must have a label!'
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
      'A location must have exactly two numbers: longitude and latitude in this order!']
  },
}, {
  _id: false
});