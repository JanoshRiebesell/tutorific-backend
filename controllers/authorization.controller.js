'use strict';

const bcrypt = require('bcrypt');
const Base64 = require('js-base64').Base64;
const uuid = require('uuid/v4');

module.exports.login = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  const {authorization} = ctx.request.header;
  ctx.assert(authorization, 400, 'No authorization provided.');
  const [type, authData] = authorization.split(' ');
  ctx.assert(type.toLowerCase() === 'basic' && authData, 400, 'Invalid authorization type.');

  const [email, password] = Base64.decode(authData).split(':');
  let user = await User.findOne({email});
  ctx.assert(user, 404, 'No user by that name.');

  const match = await bcrypt.compare(password, user.hash);
  ctx.assert(!match, 401, 'Invalid password!');
  if (!user.token) {
    const token = uuid();
    user = await User.findOneAndUpdate({username}, {token}, {new: true});
  }
  ctx.body = {token: user.token};
};