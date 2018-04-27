'use strict';

const Tutor = require('../models/tutor.model');

module.exports.getTutor = async (ctx, next) => {
  ctx.body = await Tutor.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find tutor with id ${ctx.params.id}.`);
};

module.exports.getTutors = async (ctx, next) => {
  ctx.body = await Tutor.find();
  ctx.assert(ctx.body, 404, `Could not find any tutors.`);
};

module.exports.createTutor = async (ctx, next) => {
  ctx.body = await Tutor.create(ctx.request.body);
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