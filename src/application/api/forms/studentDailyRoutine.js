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
    idStudentDaily: Joi.number().required(),
    idRoutineType: Joi.number().required(),
    idRoutineTypeDetail: Joi.number().required(),
    startHourRoutine: Joi.string().regex(patternTime).required(),
    endHourRoutine: Joi.string().regex(patternTime).required(),
    description: Joi.string().max(1000),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    idStudentDaily: Joi.number().required(),
    idRoutineType: Joi.number().required(),
    idRoutineTypeDetail: Joi.number().required(),
    startHourRoutine: Joi.string().regex(patternTime).required(),
    endHourRoutine: Joi.string().regex(patternTime).required(),
    description: Joi.string().max(1000),
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
    idStudentDaily: Joi.number().required(),
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
