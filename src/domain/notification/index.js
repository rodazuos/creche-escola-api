const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idUser: dataValues.idUser || dataValues.iduser,
    userName: dataValues.userName || dataValues.username,
    notificationDate: dataValues.notificationDate || dataValues.notificationdate,
    title: dataValues.title,
    description: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, notificationRepository }) => {
  const newRegister = await notificationRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, notificationRepository, includeDeleted = true }) => {
  const dataFound = await notificationRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, notificationRepository }) => {
  const dataUpdated = await notificationRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, notificationRepository }) => {
  return notificationRepository.logicDeleteById(id);
};

const getAll = async ({ notificationRepository, filters }) => {
  const listAll = await notificationRepository.getList(filters);
  listAll.queryResult = listAll.queryResult.map((dataList) => dto(dataList));
  return listAll;
};

module.exports = {
  create,
  update,
  deleteLogic,
  getById,
  getAll,
};
