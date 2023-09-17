const Joi = require("joi");

const subList = ["starter", "pro", "business"];

const authSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required email field",
  }),
  subscription: Joi.string().valid(...subList),
});

const emailSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "missing required field email",
  }),
});

module.exports = {
  authSchema,
  emailSchema,
};
