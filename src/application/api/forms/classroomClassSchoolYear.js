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
    idClassroom: Joi.number().required(),
    idClassSchoolYear: Joi.number().required(),
    weekday: Joi.string().max(300).required(),
    startTime: Joi.string().regex(patternTime).required(),
    endTime: Joi.string().regex(patternTime).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    idClassroom: Joi.number().required(),
    idClassSchoolYear: Joi.number().required(),
    weekday: Joi.string().max(300).required(),
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
    title: Joi.string().max(100),
    teacher: Joi.string().max(100),
    idStudentsClass: Joi.number(),
    limit: Joi.number().min(1).max(10),
    page: Joi.number(),
  });

  return validateSchema(schema, data);
};

const sanitizeFiltersListByIdStudentsClass = async (data) => {
  const schema = Joi.object({
    title: Joi.string().max(100),
    teacher: Joi.string().max(100),
    idStudentsClass: Joi.number().required(),
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
  sanitizeFiltersListByIdStudentsClass,
};
