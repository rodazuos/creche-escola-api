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

const sanitizeCreateStudent = async (data) => {
  const schema = Joi.object({
    cpf: Joi.string().min(11).max(11).required(),
    studentName: Joi.string().max(300).required(),
    photo: Joi.string().max(300).allow(null, ""),
    birthdate: Joi.date().required(),
    entryTime: Joi.string().regex(patternTime).required(),
    depertureTime: Joi.string().regex(patternTime).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdateStudent = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    cpf: Joi.string().min(11).max(11).required(),
    studentName: Joi.string().max(300).required(),
    photo: Joi.string().max(300).allow(null, ""),
    birthdate: Joi.date().required(),
    entryTime: Joi.string().regex(patternTime).required(),
    depertureTime: Joi.string().regex(patternTime).required(),
    active: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeDeleteLogicStudent = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeFiltersListStudent = async (data) => {
  const schema = Joi.object({
    studentName: Joi.string(),
    limit: Joi.number().min(1).max(10),
    page: Joi.number(),
  });

  return validateSchema(schema, data);
};

module.exports = {
  sanitizeCreateStudent,
  sanitizeGetById,
  sanitizeUpdateStudent,
  sanitizeDeleteLogicStudent,
  sanitizeFiltersListStudent,
};
