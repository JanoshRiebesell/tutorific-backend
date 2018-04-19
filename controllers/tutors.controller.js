'use strict';

const Tutor = require('../models/tutors.model');

module.exports.getTutor = async (ctx, next) => {
  ctx.body = await Tutor.findById(ctx.params.id);
};

module.exports.getTutors = async (ctx, next) => {
  ctx.body = await Tutor.find();
};

module.exports.createTutor = async (ctx, next) => {
  ctx.body = await Tutor.create(ctx.request.body);
};

module.exports.updateTutor = async (ctx, next) => {
  ctx.body = await Tutor.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
};

module.exports.deleteTutor = async (ctx, next) => {
  ctx.body = await Tutor.findByIdAndRemove(ctx.params.id);
};