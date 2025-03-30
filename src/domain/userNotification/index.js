const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  let readNotification = dataValues.readNotification;
  if (readNotification === null || readNotification === undefined) {
    readNotification = dataValues.readnotification;
  }

  return {
    id: dataValues.id,
    idNotification: dataValues.idNotification || dataValues.idnotification,
    idUser: dataValues.idUser || dataValues.iduser,
    readNotification,
    userName: dataValues.userName || dataValues.username,
    notificationDate: dataValues.notificationDate || dataValues.notificationdate,
    title: dataValues.title,
    description: dataValues.description,
    idUserNotification: dataValues.idUserNotification || dataValues.idusernotification,
    userNameNotification: dataValues.userNameNotification || dataValues.usernamenotification,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, userNotificationRepository }) => {
  sanitizedData.readNotification = false;
  const newRegister = await userNotificationRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, userNotificationRepository, includeDeleted = true }) => {
  const dataFound = await userNotificationRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, userNotificationRepository }) => {
  const dataUpdated = await userNotificationRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, userNotificationRepository }) => {
  return userNotificationRepository.logicDeleteById(id);
};

const getAll = async ({ userNotificationRepository, filters }) => {
  const listAll = await userNotificationRepository.getList(filters);
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
