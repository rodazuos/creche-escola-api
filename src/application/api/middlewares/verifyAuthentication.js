const { UnauthorizedExcepation } = require("../../../infrastructure/errors");
const jwt = require("../../../utils/jwt");
const userDomain = require("../../../domain/user");

module.exports = ({ repository }) => {
  const { userRepository } = repository;

  const verifyAuthentication = async (ctx, next) => {
    try {
      const token = ctx.request.headers["authorization"];
      const validToken = await jwt.verify(token);

      const user = await userDomain.getById({
        userRepository,
        id: validToken.id,
        includeDeleted: false,
      });

      ctx.request.userState = {
        id: user.id,
        idTypeAccount: user.idTypeAccount,
      };
      return next();
    } catch (error) {
      throw UnauthorizedExcepation("Usuário não autorizado!");
    }
  };

  return verifyAuthentication;
};
