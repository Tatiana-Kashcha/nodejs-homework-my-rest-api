const Joi = require("joi");

const subList = ["starter", "pro", "business"];

const authSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  subscription: Joi.string().valid(...subList),
  token: String,
});

module.exports = {
  authSchema,
};
