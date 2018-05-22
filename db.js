const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/tutorific');
  mongoose.connection.on('connected', () => {
    console.log('Connected to local Tutorific database');
  });
} else if (process.env.NODE_ENV === 'production') {
  mongoose.connect(
    `mongodb://
      ${process.env.DB_USER}:
      ${process.env.DB_PASSWORD}
      @ds229790.mlab.com:29790/tutorific`
  );
  mongoose.connection.on('connected', () => {
    console.log('Connected to mLab Tutorific database');
  });
}