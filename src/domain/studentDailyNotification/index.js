const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    studentDaily: dataValues.studentDaily || dataValues.studentdaily,
    dateDaily: dataValues.dateDaily || dataValues.datedaily,
    idUser: dataValues.idUser || dataValues.iduser,
    userName: dataValues.userName || dataValues.username,
    description: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentDailyNotificationRepository }) => {
  const newRegister = await studentDailyNotificationRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentDailyNotificationRepository, includeDeleted = true }) => {
  const dataFound = await studentDailyNotificationRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentDailyNotificationRepository }) => {
  const dataUpdated = await studentDailyNotificationRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentDailyNotificationRepository }) => {
  return studentDailyNotificationRepository.logicDeleteById(id);
};

const getAll = async ({ studentDailyNotificationRepository, filters }) => {
  const listAll = await studentDailyNotificationRepository.getList(filters);
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
