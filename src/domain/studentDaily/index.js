const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idStudent: dataValues.idStudent || dataValues.idstudent,
    dateDaily: dataValues.dateDaily || dataValues.datedaily,
    attended: dataValues.attended,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentDailyRepository }) => {
  const newRegister = await studentDailyRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentDailyRepository, includeDeleted = true }) => {
  const dataFound = await studentDailyRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentDailyRepository }) => {
  const dataUpdated = await studentDailyRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentDailyRepository }) => {
  return studentDailyRepository.logicDeleteById(id);
};

const getAll = async ({ studentDailyRepository, filters }) => {
  const listAll = await studentDailyRepository.getList(filters);
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
