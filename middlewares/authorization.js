'use strict';

module.exports.authorize = async (ctx, next) => {
  if (ctx.headers && ctx.headers['authorization']) {
    const [type, token] = ctx.headers['authorization'].split(' ');
    if (type.toLowerCase() !== 'bearer') {
      ctx.status = 401;
      ctx.body = 'Invalid authorization type.';
      return;
    }
    ctx.state.user = await User.findOne({token});

    if (!ctx.state.user) {
      ctx.status = 401;
      return;
    }
  }

  await next();
};