const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const studentMedicamentDomain = require("../../../domain/studentMedicament");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
} = require("../forms/studentMedicament");

module.exports = ({ repository }) => {
  const { studentMedicamentRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await studentMedicamentDomain.create({ sanitizedData, studentMedicamentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getById = async (ctx) => {
    try {
      const { id } = await sanitizeGetById(ctx.request.params);
      ctx.body = await studentMedicamentDomain.getById({ id, studentMedicamentRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const update = async (ctx) => {
    try {
      const sanitizedData = await sanitizeUpdate({
        ...ctx.request.params,
        ...ctx.request.body,
      });
      ctx.body = await studentMedicamentDomain.update({ sanitizedData, studentMedicamentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const deleteLogic = async (ctx) => {
    try {
      const { id } = await sanitizeDeleteLogic(ctx.request.params);
      await studentMedicamentDomain.deleteLogic({ id, studentMedicamentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAll = async (ctx) => {
    try {
      const filters = await sanitizeFiltersList(ctx.request.query);
      ctx.body = await studentMedicamentDomain.getAll({ studentMedicamentRepository, filters });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  return {
    create,
    update,
    getById,
    deleteLogic,
    getAll,
  };
};
