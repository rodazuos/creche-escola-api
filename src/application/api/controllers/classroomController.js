const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const classroomDomain = require("../../../domain/classroom");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
} = require("../forms/classroom");

module.exports = ({ repository }) => {
  const { classroomRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await classroomDomain.create({ sanitizedData, classroomRepository });
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
      ctx.body = await classroomDomain.getById({ id, classroomRepository });
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
      ctx.body = await classroomDomain.update({ sanitizedData, classroomRepository });
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
      await classroomDomain.deleteLogic({ id, classroomRepository });
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
      ctx.body = await classroomDomain.getAll({ classroomRepository, filters });
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
