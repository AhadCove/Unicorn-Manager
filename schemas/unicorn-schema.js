const Joi = require('joi');

module.exports.PostUnicornSchema = {
  id: Joi.number(),
  name: Joi.string().min(3).required(),
  gender: Joi.string().min(3).valid('male', 'female'),
  color: Joi.string().min(3),
  locationId: Joi.number().required().valid(1, 2, 3),
}

module.exports.PutUnicornSchema = {
  location: Joi.required().valid(1, 2, 3, 'pasture', 'barn', 'corral')
}