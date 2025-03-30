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
    idStudent: Joi.number().required(),
    medicament: Joi.string().max(500).required(),
    dosage: Joi.string().max(100).required(),
    description: Joi.string().max(1000),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    idUser: Joi.number().required(),
    idStudent: Joi.number().required(),
    medicament: Joi.string().max(500).required(),
    dosage: Joi.string().max(100).required(),
    description: Joi.string().max(1000),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
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
    idStudent: Joi.number().required(),
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
