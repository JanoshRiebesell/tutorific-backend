module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = err.stack;
    ctx.status = err.status || 500;
    if (err.name === 'ValidationError' || err.name === 'BulkWriteError') ctx.status = 400;
  }
};