'use strict';

const bcrypt = require('bcrypt');

const Tutor = require('../models/tutor.model');

module.exports.createTutor = async (ctx, next) => {
  const {password, location: {lat, lng}} = ctx.request.body;
  ctx.assert(password, 400, 'Cannot create new tutor without password!');
  ctx.request.body.passwordHash = await bcrypt.hash(password, 1);
  ctx.request.body.location.coordinates = [lng, lat];
  const newTutor = await Tutor.create(ctx.request.body);
  ctx.body = `Created new tutor with id ${newTutor._id}.`;
};

module.exports.getTutor = async (ctx, next) => {
  ctx.body = await Tutor.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find tutor with id ${ctx.params.id}.`);
};

module.exports.getTutors = async (ctx, next) => {
  const {lat, lng, status, lastLoginAfter, maxDistance} = ctx.request.query;
  const dbQuery = {};
  if (status) dbQuery.status = status;
  if (lastLoginAfter) dbQuery.updatedAt = {$gte: new Date(lastLoginAfter)};
  if (lat && lng) dbQuery.location = {
    $near: {
      $geometry: {type: 'Point', coordinates: [lng, lat]},
      $maxDistance: maxDistance * 1000
    }
  };
  ctx.body = await Tutor.find(dbQuery);
  ctx.assert(ctx.body, 404, `Could not find any tutors.`);
};

module.exports.updateTutor = async (ctx, next) => {
  ctx.body = await Tutor.findByIdAndUpdate(
    ctx.params.id, ctx.request.body,
    {new: true, runValidators: true}
  );
};

module.exports.deleteTutor = async (ctx, next) => {
  ctx.body = await Tutor.findByIdAndRemove(ctx.params.id);
};