const Joi = require("joi");
const { BadRequestException } = require("../../../infrastructure/errors");

const patternTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

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
    schoolYear: Joi.string().min(4).max(4).required(),
    idStudentsClass: Joi.number().required(),
    startTime: Joi.string().regex(patternTime).required(),
    endTime: Joi.string().regex(patternTime).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    schoolYear: Joi.string().min(4).max(4).required(),
    idStudentsClass: Joi.number().required(),
    startTime: Joi.string().regex(patternTime).required(),
    endTime: Joi.string().regex(patternTime).required(),
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
    schoolYear: Joi.string().min(4).max(4),
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
