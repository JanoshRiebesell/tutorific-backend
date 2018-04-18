const mongoose = require('mongoose');
const validator = require('validator');
const Subject = require('./subjects.model');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
  firstname: {
    type: String,
    required: 'A tutor must provide a firstname!',
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: 'A tutor must provide a lastname!',
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: 'A tutor must provide an email!',
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
  subjects: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Subject'
  },
  address: {
    type: String,
    required: 'A tutor must provide a public space or city district where the tutoring should take place.'
  },
  status: {
    type: String,
    enum: ['registered', 'active', 'inactive', 'deleted'],
    default: 'registered'
  },
  fieldOfStudy: String,
  semester: {
    type: Number,
    min: 1,
    max: 50
  },
  birthday: Date,
  birthplace: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  }
}, {timestamps: true})

module.exports = mongoose.model('Tutor', TutorSchema);