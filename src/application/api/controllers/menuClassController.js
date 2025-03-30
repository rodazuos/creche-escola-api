const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const menuClassDomain = require("../../../domain/menuClass");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
} = require("../forms/menuClass");

module.exports = ({ repository }) => {
  const { menuClassRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await menuClassDomain.create({ sanitizedData, menuClassRepository });
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
      ctx.body = await menuClassDomain.getById({ id, menuClassRepository });
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
      ctx.body = await menuClassDomain.update({ sanitizedData, menuClassRepository });
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
      await menuClassDomain.deleteLogic({ id, menuClassRepository });
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
      ctx.body = await menuClassDomain.getAll({ menuClassRepository, filters });
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
