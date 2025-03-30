const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const studentsClassSchoolYeartionDomain = require("../../../domain/StudentsClassSchoolYear");

const {
  sanitizeCreate,
  sanitizeGetById,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeFiltersList,
  sanitizeFiltersListByIdStudent,
} = require("../forms/studentsClassSchoolYear");

module.exports = ({ repository }) => {
  const { studentsClassSchoolYearRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await studentsClassSchoolYeartionDomain.create({ sanitizedData, studentsClassSchoolYearRepository });
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
      ctx.body = await studentsClassSchoolYeartionDomain.getById({ id, studentsClassSchoolYearRepository });
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
      ctx.body = await studentsClassSchoolYeartionDomain.update({ sanitizedData, studentsClassSchoolYearRepository });
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
      await studentsClassSchoolYeartionDomain.deleteLogic({ id, studentsClassSchoolYearRepository });
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
      ctx.body = await studentsClassSchoolYeartionDomain.getAll({ studentsClassSchoolYearRepository, filters });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getAllByIdStudent = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListByIdStudent({ ...ctx.request.query, ...ctx.request.params });
      ctx.body = await studentsClassSchoolYeartionDomain.getAll({
        studentsClassSchoolYearRepository,
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
    getAll,
    getAllByIdStudent,
  };
};
