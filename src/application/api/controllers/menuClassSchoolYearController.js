const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const menuClassSchoolYeartionDomain = require("../../../domain/menuClassSchoolYear");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersListByidStudentsClass,
} = require("../forms/menuClassSchoolYear");

module.exports = ({ repository }) => {
  const { menuClassSchoolYearRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await menuClassSchoolYeartionDomain.create({ sanitizedData, menuClassSchoolYearRepository });
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
      ctx.body = await menuClassSchoolYeartionDomain.getById({ id, menuClassSchoolYearRepository });
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
      ctx.body = await menuClassSchoolYeartionDomain.update({ sanitizedData, menuClassSchoolYearRepository });
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
      await menuClassSchoolYeartionDomain.deleteLogic({ id, menuClassSchoolYearRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAllByidStudentsClass = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListByidStudentsClass({ ...ctx.request.query, ...ctx.request.params });
      ctx.body = await menuClassSchoolYeartionDomain.getAll({
        menuClassSchoolYearRepository,
        filters,
      });
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
    getAllByidStudentsClass,
  };
};
