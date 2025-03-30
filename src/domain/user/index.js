const { ConflictException, UnauthorizedExcepation } = require("../../infrastructure/errors");
const { generateHash } = require("../../utils/hashData");
const { generateFirstPasswordByCpf } = require("../../utils/utils");

const TYPE_ACCOUNT_ENUM = Object.freeze({
  ADMIN: 1,
  USER: 2,
  ADMIN_USER: 3,
});

const dtoUser = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idKindergarten: dataValues.idKindergarten || dataValues.idkindergarten,
    idTypeAccount: dataValues.idTypeAccount || dataValues.idtypeaccount,
    cpf: dataValues.cpf,
    name: dataValues.userName || dataValues.username,
    photo: dataValues.photo,
    accessSystem: dataValues.accessSystem || dataValues.accesssystem,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ userData, userRepository }) => {
  let user = null;
  try {
    user = await userRepository.findByCpf(userData.cpf);
  } catch (error) {
    // continue because this error is user not exists
  }

  if (user && user.idTypeAccount === userData.idTypeAccount) {
    throw ConflictException("Usuário já cadastrado!");
  }

  const firstPassword = await generateFirstPasswordByCpf(userData.cpf);
  userData.userPassword = await generateHash(firstPassword);
  const newUser = await userRepository.create(userData);
  return dtoUser(newUser);
};

const findByCpf = async ({ cpf, userRepository }) => {
  const user = await userRepository.findByCpf(cpf);
  return dtoUser(user);
};

const getById = async ({ id, userRepository, includeDeleted = true }) => {
  const user = await userRepository.getById(id, { includeDeleted });
  return dtoUser(user);
};

const update = async ({ userData, userRepository }) => {
  const user = await userRepository.update(userData);
  return dtoUser(user);
};

const deleteLogicUser = async ({ id, userRepository }) => {
  return userRepository.logicDeleteById(id);
};

const getUserList = async ({ userRepository, filters }) => {
  const listUsers = await userRepository.getListUsers(filters);
  listUsers.queryResult = listUsers.queryResult.map((user) => dtoUser(user));
  return listUsers;
};

const updatePassword = async ({ userRepository, id, userPassword, newPassword }) => {
  const user = await getById({ id, userRepository });
  const passwordHash = await generateHash(userPassword);
  if (user.userPassword !== passwordHash) {
    throw UnauthorizedExcepation("Usuário não autorizado a realizar alteração de senha!");
  }

  const hashNewPassword = await generateHash(newPassword);
  const result = await userRepository.updatePassword({ id, userPassword: hashNewPassword });
  return result;
};

const resetPassword = async ({ userRepository, id }) => {
  const user = await getById({ id, userRepository });
  const resetdPasswordValue = await generateFirstPasswordByCpf(user.cpf);
  const resetPasswordHash = await generateHash(resetdPasswordValue);
  const result = await userRepository.updatePassword({ id, userPassword: resetPasswordHash });
  return result;
};

module.exports = {
  TYPE_ACCOUNT_ENUM,
  create,
  update,
  deleteLogicUser,
  findByCpf,
  getById,
  getUserList,
  updatePassword,
  resetPassword,
};
