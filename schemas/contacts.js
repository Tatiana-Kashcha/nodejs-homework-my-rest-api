const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
});

// const customMessages = {
//   'any.required': 'missing required {#label} field'
// };
// const addSchema = Joi.object({
//   name: Joi.string().required().messages(customMessages),
//   email: Joi.string().email().required().messages(customMessages),
//   phone: Joi.string().required().messages(customMessages)
// });

module.exports = {
  addSchema,
};
