const { UnauthorizedExcepation } = require("../../../infrastructure/errors");
const { TYPE_ACCOUNT_ENUM } = require("../../../domain/user");

module.exports = () => {
  const userAuthorization = async (ctx, next) => {
    const { idTypeAccount } = ctx.request.userState;
    if (TYPE_ACCOUNT_ENUM.USER === idTypeAccount) {
      return next();
    }
    throw UnauthorizedExcepation("Usuário não autorizado!");
  };

  return userAuthorization;
};
