const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idRoutineType: dataValues.idRoutineType || dataValues.idroutinetype,
    titleRoutineType: dataValues.titleRoutineType || dataValues.titleroutinetype,
    title: dataValues.title,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, routineTypeDetailRepository }) => {
  const newRegister = await routineTypeDetailRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, routineTypeDetailRepository, includeDeleted = true }) => {
  const dataFound = await routineTypeDetailRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, routineTypeDetailRepository }) => {
  const dataUpdated = await routineTypeDetailRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, routineTypeDetailRepository }) => {
  return routineTypeDetailRepository.logicDeleteById(id);
};

const getAll = async ({ routineTypeDetailRepository, filters }) => {
  const listAll = await routineTypeDetailRepository.getList(filters);
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
