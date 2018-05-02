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

module.exports.getPerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, 'An id must be provided in order to retrieve a person!');
  ctx.body = await Student.findById(ctx.params.id);
  if (!ctx.body) ctx.body = await Tutor.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find a tutor or student with id ${ctx.params.id}.`);
};

module.exports.getPersons = async (ctx, next) => {
  const {userType, lat, lng, status, lastLoginAfter, maxDistance} = ctx.request.query;
  ctx.assert(userType === 'student' || userType === 'tutor', 400, 'Please provide a user type of either student or tutor!');
  const Person = userType === 'student' ? Student : Tutor;
  const dbQuery = {};
  if (status) dbQuery.status = status;
  if (lastLoginAfter) dbQuery.updatedAt = {$gte: new Date(lastLoginAfter)};
  if (lat && lng) dbQuery.location = {
    $near: {
      $geometry: {type: 'Point', coordinates: [lng, lat]},
      $maxDistance: maxDistance * 1000
    }
  };
  ctx.body = await Person.find(dbQuery);
  ctx.assert(ctx.body, 404, `Could not find any ${userType}s based on these filters.`);
};

module.exports.updatePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, 'An id must be provided in order to update a person!');
  ctx.assert(ctx.request.body, 400, 'An request body must be provided in order to update a person!');
  ctx.body = await Person.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true, runValidators: true});
  if (!ctx.body) ctx.body = await Person.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true, runValidators: true});
  ctx.assert(ctx.body, 404, `Could not find a tutor or student with id ${ctx.params.id}.`);
};

module.exports.deletePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400, 'An id must be provided in order to delete a person!');
  ctx.body = await Person.findByIdAndRemove(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find a tutor or student with id ${ctx.params.id}.`);
};