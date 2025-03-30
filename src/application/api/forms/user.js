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

const sanitizeGetUserByCpf = async (data) => {
  const schema = Joi.object({
    cpf: Joi.string().min(11).max(11).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeGetById = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeCreateUser = async (data) => {
  const schema = Joi.object({
    idKindergarten: Joi.number().required(),
    idTypeAccount: Joi.number().required(),
    cpf: Joi.string().min(11).max(11).required(),
    userName: Joi.string().max(300).required(),
    photo: Joi.string().max(300).allow(null, ""),
    accessSystem: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdateUser = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    idKindergarten: Joi.number().required(),
    idTypeAccount: Joi.number().required(),
    cpf: Joi.string().min(11).max(11).required(),
    userName: Joi.string().max(300).required(),
    photo: Joi.string().max(300).allow(null, ""),
    accessSystem: Joi.boolean().required(),
    active: Joi.boolean().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeDeleteLogicUser = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeResetPasswordUser = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validateSchema(schema, data);
};

const sanitizeUpdatePassword = async (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    userPassword: Joi.string().max(300).required(),
    newPassword: Joi.string().max(300).required(),
  });

  return validateSchema(schema, data);
};

const sanitizeFiltersListUser = async (data) => {
  const schema = Joi.object({
    userName: Joi.string(),
    limit: Joi.number().min(1).max(10),
    page: Joi.number(),
  });

  return validateSchema(schema, data);
};

module.exports = {
  sanitizeCreateUser,
  sanitizeGetById,
  sanitizeGetUserByCpf,
  sanitizeUpdateUser,
  sanitizeDeleteLogicUser,
  sanitizeUpdatePassword,
  sanitizeFiltersListUser,
  sanitizeResetPasswordUser,
};
