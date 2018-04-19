const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tutorific');

mongoose.connection.on('connected', () => {
  console.log('Connected to Tutorific database');
});