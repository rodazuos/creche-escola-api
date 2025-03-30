const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const studentDomain = require("../../../domain/student");

const {
  sanitizeCreateStudent,
  sanitizeGetById,
  sanitizeUpdateStudent,
  sanitizeDeleteLogicStudent,
  sanitizeFiltersListStudent,
} = require("../forms/student");

module.exports = ({ repository }) => {
  const { studentRepository } = repository;

  const create = async (ctx) => {
    try {
      const studentData = await sanitizeCreateStudent(ctx.request.body);
      ctx.body = await studentDomain.create({ studentData, studentRepository });
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
      ctx.body = await studentDomain.getById({ id, studentRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const update = async (ctx) => {
    try {
      const studentData = await sanitizeUpdateStudent({
        ...ctx.request.params,
        ...ctx.request.body,
      });
      ctx.body = await studentDomain.update({ studentData, studentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const deleteLogic = async (ctx) => {
    try {
      const { id } = await sanitizeDeleteLogicStudent(ctx.request.params);
      await studentDomain.deleteLogicUser({ id, studentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getStudents = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListStudent(ctx.request.query);
      ctx.body = await studentDomain.getStudentList({ studentRepository, filters });
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
    getStudents,
  };
};
