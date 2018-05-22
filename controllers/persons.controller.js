'use strict';

const bcrypt = require('bcrypt');

const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');

module.exports.createPerson = async (ctx, next) => {
  const {userType, password, location: {lat, lng}} = ctx.request.body;
  ctx.assert(userType === 'student' || userType === 'tutor', 400, 'Please provide a user type of either student or tutor!');
  const Person = userType === 'student' ? Student : Tutor;
  ctx.assert(password, 400, `Cannot create new ${userType} without a password!`);
  ctx.request.body.passwordHash = await bcrypt.hash(password, 1);
  ctx.request.body.location.coordinates = [lng, lat];
  ctx.body = await Person.create(ctx.request.body);
  ctx.assert(ctx.body, 400, `Could not create ${userType} from provided request body.`);
};

const constructDbQuery = ({lat, lng, lastLoginAfter, maxDistance, ...rest}) => {
  const dbQuery = {...rest};
  if (lastLoginAfter) dbQuery.updatedAt = {$gte: new Date(lastLoginAfter)};
  if (lat && lng) dbQuery.location = {
    $near: {
      $geometry: {type: 'Point', coordinates: [lng, lat]},
      $maxDistance: maxDistance * 1000,
    }
  };
  return dbQuery;
};

module.exports.getPersons = async (ctx, next) => {
  const {userType} = ctx.request.query;
  const dbQuery = constructDbQuery(ctx.request.query);
  if (userType === 'student') ctx.body = await Student.find(dbQuery);
  else if (userType === 'tutor') ctx.body = await Tutor.find(dbQuery);
  else {
    const students = await Student.find(dbQuery);
    const tutors = await Tutor.find(dbQuery);
    ctx.body = [...students, ...tutors];
  }
  ctx.status = 200;
  ctx.assert(ctx.body, 204, `Could not find any ${userType || 'user'}s based on these filters.`);
};

module.exports.updatePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, 'An id must be provided in order to update a person!');
  ctx.assert(ctx.request.body, 400, 'An request body must be provided in order to update a person!');
  ctx.body = await Person.findOneAndUpdate(ctx.params.id, ctx.request.body, {new: true, runValidators: true});
  if (!ctx.body) ctx.body = await Person.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true, runValidators: true});
  ctx.assert(ctx.body, 204, `Could not find a tutor or student with id ${ctx.params.id}.`);
};

module.exports.deletePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, 'An id must be provided in order to delete a person!');
  ctx.body = await Person.findByIdAndRemove(ctx.params.id);
  ctx.assert(ctx.body, 204, `Could not find a tutor or student with id ${ctx.params.id}.`);
};