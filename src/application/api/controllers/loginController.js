const { OK } = require("http-status");
const loginDomain = require("../../../domain/login");
const Logger = require("../../../utils/logger");

const { sanitizeLogin, sanitizeAuthorization } = require("../forms/login");

module.exports = ({ repository }) => {
  const { userRepository } = repository;

  const login = async (ctx) => {
    try {
      const loginData = await sanitizeLogin(ctx.request.body);
      ctx.body = await loginDomain.getAuthorization({ ...loginData, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = JSON.stringify({ message: error.message });
    }
  };

  const authorization = async (ctx) => {
    try {
      const { authorization } = ctx.request.headers;
      const { authorization: token } = await sanitizeAuthorization({ authorization });
      await loginDomain.validateToken({ token, userRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = JSON.stringify({ message: error.message });
    }
  };

  return {
    login,
    authorization,
  };
};
