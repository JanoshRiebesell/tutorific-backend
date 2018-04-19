'use strict';

const Connection = require('../models/connections.model');

module.exports.createConnection = async (ctx, next) => {
  ctx.body = await Connection.create(ctx.request.body);
};

module.exports.updateConnection = async (ctx, next) => {
  ctx.body = await Connection.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true});
};

module.exports.deleteConnection = async (ctx, next) => {
  ctx.body = await Connection.findByIdAndRemove(ctx.params.id);
};