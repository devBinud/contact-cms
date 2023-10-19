const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateCreateContact = (data) => {
  return createContactSchema.validate(data);
};

module.exports = {
  validateCreateContact,
};
