'use strict';

const bcrypt = require('bcrypt');
const Base64 = require('js-base64').Base64;
const uuid = require('uuid/v4');

const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');

module.exports.login = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  const {authorization} = ctx.request.header;
  ctx.assert(authorization, 400, 'No authorization provided.');
  const [type, authData] = authorization.split(' ');
  ctx.assert(type.toLowerCase() === 'basic' && authData, 400, 'Invalid authorization type.');

  const [email, password, userType] = Base64.decode(authData).split(':');
  const Collection = userType === 'student' ? Student : Tutor;
  const user = await Collection.findOne({email});
  ctx.assert(user, 404, 'No user by that name.');

  const match = await bcrypt.compare(password, user.passwordHash);
  ctx.assert(match, 401, 'Invalid password!');
  if (!user.token) {
    user.token = uuid();
    await user.save();
  }
  ctx.body = {token: user.token};
};