const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const userNotificationDomain = require("../../../domain/userNotification");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersListByIdUser,
  sanitizeFiltersListByIdNotification,
} = require("../forms/userNotification");

module.exports = ({ repository }) => {
  const { userNotificationRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await userNotificationDomain.create({ sanitizedData, userNotificationRepository });
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
      ctx.body = await userNotificationDomain.getById({ id, userNotificationRepository });
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
      ctx.body = await userNotificationDomain.update({ sanitizedData, userNotificationRepository });
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
      await userNotificationDomain.deleteLogic({ id, userNotificationRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAllByIdUser = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListByIdUser({ ...ctx.request.params, ...ctx.request.query });
      ctx.body = await userNotificationDomain.getAll({ userNotificationRepository, filters });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAllByidNotification = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListByIdNotification({ ...ctx.request.params, ...ctx.request.query });
      ctx.body = await userNotificationDomain.getAll({ userNotificationRepository, filters });
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
    getAllByIdUser,
    getAllByidNotification,
  };
};
