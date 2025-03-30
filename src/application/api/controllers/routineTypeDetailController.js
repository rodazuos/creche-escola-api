const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const routineTypeDetailDomain = require("../../../domain/routineTypeDetail");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
} = require("../forms/routineTypeDetail");

module.exports = ({ repository }) => {
  const { routineTypeDetailRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await routineTypeDetailDomain.create({ sanitizedData, routineTypeDetailRepository });
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
      ctx.body = await routineTypeDetailDomain.getById({ id, routineTypeDetailRepository });
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
      ctx.body = await routineTypeDetailDomain.update({ sanitizedData, routineTypeDetailRepository });
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
      await routineTypeDetailDomain.deleteLogic({ id, routineTypeDetailRepository });
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
      ctx.body = await routineTypeDetailDomain.getAll({ routineTypeDetailRepository, filters });
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
