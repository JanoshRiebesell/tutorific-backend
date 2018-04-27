'use strict';

const Student = require('../models/student.model');

module.exports.getStudent = async (ctx, next) => {
  ctx.body = await Student.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find student with id ${ctx.params.id}.`);
};

module.exports.getStudents = async (ctx, next) => {
  ctx.body = await Student.find();
  ctx.assert(ctx.body, 404, `Could not find any students.`);
};

module.exports.createStudent = async (ctx, next) => {
  ctx.body = await Student.create(ctx.request.body);
};

module.exports.updateStudent = async (ctx, next) => {
  ctx.body = await Student.findByIdAndUpdate(
    ctx.params.id, ctx.request.body,
    {new: true, runValidators: true}
  );
};

module.exports.deleteStudent = async (ctx, next) => {
  ctx.body = await Student.findByIdAndRemove(ctx.params.id);
};