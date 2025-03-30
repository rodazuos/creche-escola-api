const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const classroomClassSchoolYearDomain = require("../../../domain/classroomClassSchoolYear");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
  sanitizeFiltersListByIdStudentsClass,
} = require("../forms/classroomClassSchoolYear");

module.exports = ({ repository }) => {
  const { classroomClassSchoolYearRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await classroomClassSchoolYearDomain.create({ sanitizedData, classroomClassSchoolYearRepository });
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
      ctx.body = await classroomClassSchoolYearDomain.getById({ id, classroomClassSchoolYearRepository });
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
      ctx.body = await classroomClassSchoolYearDomain.update({ sanitizedData, classroomClassSchoolYearRepository });
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
      await classroomClassSchoolYearDomain.deleteLogic({ id, classroomClassSchoolYearRepository });
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
      ctx.body = await classroomClassSchoolYearDomain.getAll({ classroomClassSchoolYearRepository, filters });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAllByIdStudentsClass = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListByIdStudentsClass({ ...ctx.request.params, ...ctx.request.query });
      ctx.body = await classroomClassSchoolYearDomain.getAll({ classroomClassSchoolYearRepository, filters });
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
    getAllByIdStudentsClass,
  };
};
