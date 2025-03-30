const Joi = require("joi");
const { BadRequestException } = require("../../../infrastructure/errors");

const validateSchema = async (schema, data) => {
  try {
    const validFields = await schema.validateAsync(data);
    return validFields;
  } catch (error) {
    const errors = error.details.map((error) => error.message);
    throw BadRequestException(errors.join());
  }
};

const sanitizeLogin = async (data) => {
  const schema = Joi.object({
    cpf: Joi.string().min(11).max(11).required(),
    password: Joi.string().max(300).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeAuthorization = async (data) => {
  const schema = Joi.object({
    authorization: Joi.string().required(),
  });

  return validateSchema(schema, data);
};

module.exports = { sanitizeLogin, sanitizeAuthorization };
