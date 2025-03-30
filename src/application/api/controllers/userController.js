const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const userDomain = require("../../../domain/user");

const {
  sanitizeCreateUser,
  sanitizeGetById,
  sanitizeGetUserByCpf,
  sanitizeUpdateUser,
  sanitizeDeleteLogicUser,
  sanitizeUpdatePassword,
  sanitizeFiltersListUser,
  sanitizeResetPasswordUser,
} = require("../forms/user");

module.exports = ({ repository }) => {
  const { userRepository } = repository;

  const create = async (ctx) => {
    try {
      const userData = await sanitizeCreateUser(ctx.request.body);
      ctx.body = await userDomain.create({ userData, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getUserById = async (ctx) => {
    try {
      const { id } = await sanitizeGetById(ctx.request.params);
      ctx.body = await userDomain.getById({ id, userRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getUserAccount = async (ctx) => {
    try {
      const { id } = await sanitizeGetById({ id: ctx.request.userState.id });
      ctx.body = await userDomain.getById({ id, userRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getUserByCpf = async (ctx) => {
    try {
      const { cpf } = await sanitizeGetUserByCpf(ctx.request.params);
      ctx.body = await userDomain.findByCpf({ cpf, userRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const update = async (ctx) => {
    try {
      const userData = await sanitizeUpdateUser({
        ...ctx.request.params,
        ...ctx.request.body,
      });
      ctx.body = await userDomain.update({ userData, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const updateUserAccount = async (ctx) => {
    try {
      const userData = await sanitizeUpdateUser({
        id: ctx.request.userState.id,
        ...ctx.request.body,
      });
      ctx.body = await userDomain.update({ userData, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const deleteLogic = async (ctx) => {
    try {
      const { id } = await sanitizeDeleteLogicUser(ctx.request.params);
      await userDomain.deleteLogicUser({ id, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const getUsers = async (ctx) => {
    try {
      const filters = await sanitizeFiltersListUser(ctx.request.query);
      ctx.body = await userDomain.getUserList({ userRepository, filters });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const updatePassword = async (ctx) => {
    try {
      const sanitazedData = await sanitizeUpdatePassword({
        id: ctx.request.userState.id,
        ...ctx.request.body,
      });
      await userDomain.updatePassword({
        userRepository,
        ...sanitazedData,
      });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const resetPassword = async (ctx) => {
    try {
      const { id } = await sanitizeResetPasswordUser(ctx.request.params);
      await userDomain.resetPassword({
        id,
        userRepository,
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
    getUserAccount,
    updateUserAccount,
    getUserById,
    getUserByCpf,
    update,
    deleteLogic,
    getUsers,
    updatePassword,
    resetPassword,
  };
};
