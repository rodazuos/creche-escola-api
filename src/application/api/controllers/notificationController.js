const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const notificationDomain = require("../../../domain/notification");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
} = require("../forms/notification");

module.exports = ({ repository }) => {
  const { notificationRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await notificationDomain.create({ sanitizedData, notificationRepository });
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
      ctx.body = await notificationDomain.getById({ id, notificationRepository });
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
      ctx.body = await notificationDomain.update({ sanitizedData, notificationRepository });
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
      await notificationDomain.deleteLogic({ id, notificationRepository });
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
      ctx.body = await notificationDomain.getAll({ notificationRepository, filters });
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
