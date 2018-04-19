'use strict';

const Student = require('../models/students.model');

module.exports.getStudent = async (ctx, next) => {
  ctx.body = await Student.findById(ctx.params.id);
};

module.exports.getStudents = async (ctx, next) => {
  ctx.body = await Student.find();
};

module.exports.createStudent = async (ctx, next) => {
  ctx.body = await Student.create(ctx.request.body);
};

module.exports.updateStudent = async (ctx, next) => {
  ctx.body = await Student.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
};

module.exports.deleteStudent = async (ctx, next) => {
  ctx.body = await Student.findByIdAndRemove(ctx.params.id);
};