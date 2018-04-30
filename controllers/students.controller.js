'use strict';

const bcrypt = require('bcrypt');

const Student = require('../models/student.model');

module.exports.createStudent = async (ctx, next) => {
  const {password} = ctx.request.body;
  ctx.assert(password, 400, 'Cannot create new student without password!');
  ctx.request.body.passwordHash = await bcrypt.hash(password, 1);
  const newStudent = await Student.create(ctx.request.body);
  ctx.body = `Created new student with id ${newStudent._id}.`;
};

module.exports.getStudent = async (ctx, next) => {
  ctx.body = await Student.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find student with id ${ctx.params.id}.`);
};

module.exports.getStudents = async (ctx, next) => {
  ctx.body = await Student.find();
  ctx.assert(ctx.body, 404, `Could not find any students.`);
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