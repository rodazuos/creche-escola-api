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

const sanitizeCreate = async (data) => {
  const schema = Joi.object({
    idUser: Joi.number().required(),
    email: Joi.string().max(300).allow(null, ""),
    housePhoneNumber: Joi.string().max(30).allow(null, ""),
    personalPhoneNumber: Joi.string().max(30).required(),
    commercialPhoneNumber: Joi.string().max(30).allow(null, ""),
    contactDescription: Joi.string().max(300).allow(null, ""),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    idUser: Joi.number().required(),
    email: Joi.string().max(300).allow(null, ""),
    housePhoneNumber: Joi.string().max(30).allow(null, ""),
    personalPhoneNumber: Joi.string().max(30).required(),
    commercialPhoneNumber: Joi.string().max(30).allow(null, ""),
    contactDescription: Joi.string().max(300).allow(null, ""),
    active: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeDeleteLogic = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeFiltersList = async (data) => {
  const schema = Joi.object({
    idUser: Joi.number().required(),
    limit: Joi.number().min(1).max(10),
    page: Joi.number(),
  });

  return validateSchema(schema, data);
};

module.exports = {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
};
