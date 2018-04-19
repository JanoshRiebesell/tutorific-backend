module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 500;
  }
};