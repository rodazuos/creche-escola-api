const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const userStudentDomain = require("../../../domain/userStudent");

const {
  sanitizeCreate,
  sanitizeUpdate,
  sanitizeDeleteLogic,
  sanitizeStudentsByIdUser,
  sanitizeUsersByIdStudent,
} = require("../forms/userStudent");

module.exports = ({ repository }) => {
  const { userStudentRepository } = repository;

  const create = async (ctx) => {
    try {
      const sanitizedData = await sanitizeCreate(ctx.request.body);
      ctx.body = await userStudentDomain.create({ sanitizedData, userStudentRepository });
      ctx.status = OK;
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
      ctx.body = await userStudentDomain.update({ sanitizedData, userStudentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const deleteLogic = async (ctx) => {
    try {
      const sanitizedData = await sanitizeDeleteLogic(ctx.request.params);
      await userStudentDomain.deleteLogic({ sanitizedData, userStudentRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getStudentsByIdUser = async (ctx) => {
    try {
      const { idUser } = await sanitizeStudentsByIdUser(ctx.request.params);
      ctx.body = await userStudentDomain.getStudentsByIdUser({ userStudentRepository, idUser });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getUsersByIdStudent = async (ctx) => {
    try {
      const { idStudent } = await sanitizeUsersByIdStudent(ctx.request.params);
      ctx.body = await userStudentDomain.getUsersByIdStudent({ userStudentRepository, idStudent });
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
    deleteLogic,
    getStudentsByIdUser,
    getUsersByIdStudent,
  };
};
