const { UnauthorizedExcepation } = require("../../../infrastructure/errors");
const { TYPE_ACCOUNT_ENUM } = require("../../../domain/user");

module.exports = () => {
  const adminAuthorization = async (ctx, next) => {
    const { idTypeAccount } = ctx.request.userState;
    if ([TYPE_ACCOUNT_ENUM.ADMIN, TYPE_ACCOUNT_ENUM.ADMIN_USER].includes(idTypeAccount)) {
      return next();
    }
    throw UnauthorizedExcepation("Usuário não autorizado!");
  };

  return adminAuthorization;
};
