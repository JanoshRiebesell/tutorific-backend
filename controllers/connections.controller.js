'use strict';

const Connection = require('../models/connection.model');

module.exports.getConnection = async (ctx, next) => {
  ctx.body = await Connection.findById(ctx.params.id);
  ctx.assert(ctx.body, 404, `Could not find connection with id ${ctx.params.id}.`);
};

module.exports.getConnections = async (ctx, next) => {
  ctx.body = await Connection.find();
  ctx.assert(ctx.body, 404, `Could not find any connections.`);
};

module.exports.createConnection = async (ctx, next) => {
  ctx.body = await Connection.create(ctx.request.body);
};

module.exports.updateConnection = async (ctx, next) => {
  ctx.body = await Connection.findByIdAndUpdate(
    ctx.params.id, ctx.request.body,
    {new: true, runValidators: true}
  );
};

module.exports.deleteConnection = async (ctx, next) => {
  ctx.body = await Connection.findByIdAndRemove(ctx.params.id);
};