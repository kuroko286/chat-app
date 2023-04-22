const Joi = require("joi");

const registerValidator = (data) => {
  const rule = Joi.object({
    username: Joi.string().min(8).max(26).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,26}$"))
      .required(),
  });
  return rule.validate(data);
};

module.exports = { registerValidator };
