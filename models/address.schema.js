'use strict';

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  label: {
    type: String,
    required: 'An address must have a label!'
  },
  placeId: {
    type: String,
    required: 'An address must have a place ID!'
  },
  location: {
    lat: {
      type: Number,
      required: 'An address location must have a latitude!'
    },
    lng: {
      type: Number,
      required: 'An address location must have a longitude!'
    }
  },
  components: Array
}, {
  _id: false
});