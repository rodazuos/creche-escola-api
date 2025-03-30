const jwt = require("../../utils/jwt");
const { UnauthorizedExcepation, InternalServerException } = require("../../infrastructure/errors");
const { generateHash } = require("../../utils/hashData");

const getAuthorization = async ({ cpf, password, userRepository }) => {
  const user = await userRepository.findByCpf(cpf);
  const passwordHash = await generateHash(password);

  if (!user || passwordHash !== user.userPassword) {
    throw UnauthorizedExcepation("Usuário não autorizado!");
  }

  try {
    const token = await jwt.sign(user);
    const firstAccess = password === user.cpf.substring(5, 11);
    return { token, firstAccess };
  } catch (error) {
    throw InternalServerException("Erro ao gerar token de acesso!");
  }
};

const validateToken = async ({ token, userRepository }) => {
  try {
    const tokenData = token.split(" ")[1];
    const dataToken = await jwt.verify(tokenData);
    await userRepository.getById(dataToken.id, {
      includeDeleted: false,
    });
  } catch (error) {
    throw UnauthorizedExcepation("Usuário não autorizado!");
  }
};

module.exports = { getAuthorization, validateToken };
