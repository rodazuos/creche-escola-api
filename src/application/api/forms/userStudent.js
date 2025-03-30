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
    canPickUp: Joi.boolean().required(),
    receiveNotification: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdate = async (data) => {
  const schema = Joi.object({
    idUser: Joi.number().required(),
    idStudent: Joi.number().required(),
    canPickUp: Joi.boolean().required(),
    receiveNotification: Joi.boolean().required(),
    active: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeDeleteLogic = async (data) => {
  const schema = Joi.object({
    idUser: Joi.number().required(),
    idStudent: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeStudentsByIdUser = async (data) => {
  const schema = Joi.object({
    idUser: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUsersByIdStudent = async (data) => {
  const schema = Joi.object({
    idStudent: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

module.exports = {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeStudentsByIdUser,
  sanitizeUsersByIdStudent,
};
