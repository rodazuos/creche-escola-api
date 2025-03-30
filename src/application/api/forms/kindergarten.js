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

const sanitizeGetById = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    cnpj: Joi.string().max(300).required(),
    kindergartenName: Joi.string().max(300).required(),
    description: Joi.string().max(1000).allow(null, ""),
    photo: Joi.string().max(300).allow(null, ""),
    instagram: Joi.string().max(300).allow(null, ""),
    active: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

module.exports = {
  sanitizeGetById,
  sanitizeUpdate,
};
