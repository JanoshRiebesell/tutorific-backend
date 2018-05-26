'use strict';

const bcrypt = require('bcrypt');
const NodeGeocoder = require('node-geocoder');

const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.GMAPS_API_KEY,
});

const assembleAddress = ([{
  longitude, latitude, extra,
  streetName, streetNumber,
  zipcode, city, country,
}]) => ({
  street: streetName,
  streetNumber,
  zipCode: zipcode,
  city,
  country,
  coordinates: [longitude, latitude],
  placeId: extra.googlePlaceId,
})

module.exports.createPerson = async (ctx, next) => {
  const {body} = ctx.request;
  console.log(body);
  const {userType, password, address} = body;
  // userType
  ctx.assert(['student', 'tutor'].includes(userType), 400,
    'Please provide a user type of either student or tutor!'
  );
  const Person = userType === 'student' ? Student : Tutor;
  // password
  ctx.assert(password, 400, `Cannot create new ${userType} without a password!`);
  body.passwordHash = await bcrypt.hash(password, 1);
  // address
  await geocoder.geocode(Object.values(address).join(' '), (err, res) => {
    if (err) return console.log('err', err);
    body.address = assembleAddress(res);
  });
  ctx.body = await Person.create(body);
  ctx.assert(ctx.body, 400, `Could not create ${userType} from provided request body.`);
};

const constructDbQuery = ({lat, lng, lastLoginAfter, maxDistance, ...rest}) => {
  const dbQuery = {...rest};
  if (lastLoginAfter) dbQuery.updatedAt = {$gte: new Date(lastLoginAfter)};
  if (lat && lng) dbQuery.address = {
    $near: {
      $geometry: {type: 'Point', coordinates: [lng, lat]},
      $maxDistance: maxDistance * 1000,
    }
  };
  console.log(dbQuery);
  return dbQuery;
};

module.exports.getPersons = async (ctx, next) => {
  const {userType, command} = ctx.request.query;
  if (command) delete ctx.request.query.command;
  const dbQuery = constructDbQuery(ctx.request.query);
  const cmd = command || 'find';

  if (userType === 'student') ctx.body = await Student[cmd](dbQuery);
  else if (userType === 'tutor') ctx.body = await Tutor[cmd](dbQuery);
  else {
    const students = await Student[cmd](dbQuery);
    const tutors = await Tutor[cmd](dbQuery);
    if (cmd === 'count') ctx.body = students + tutors;
    else ctx.body = [...students, ...tutors];
  }
  if (!ctx.body && cmd !== 'count') {
    ctx.status = 204;
    ctx.message = `Could not find any ${userType || 'user'}s based on these filters.`;
  }
};

module.exports.updatePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400,
    'An id must be provided in order to update a person!'
  );
  ctx.assert(ctx.request.body, 400,
    'An request body must be provided in order to update a person!'
  );
  ctx.body = await Student.findByIdAndUpdate(
    ctx.params.id, ctx.request.body, {new: true, runValidators: true}
  );
  if (!ctx.body) ctx.body = await Tutor.findByIdAndUpdate(
    ctx.params.id, ctx.request.body, {new: true, runValidators: true}
  );
  if (!ctx.body) {
    ctx.status = 204;
    ctx.message = `Could not find a tutor or student with id ${ctx.params.id}.`;
  }
};

module.exports.deletePerson = async (ctx, next) => {
  ctx.assert(ctx.params.id, 400,
    'An id must be provided in order to delete a person!'
  );
  ctx.body = await Student.findByIdAndRemove(ctx.params.id);
  if (!ctx.body) ctx.body = await Tutor.findByIdAndRemove(ctx.params.id);
  if (!ctx.body) {
    ctx.status = 204;
    ctx.message = `Could not find a tutor or student with id ${ctx.params.id}.`;
  }
};