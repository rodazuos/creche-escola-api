const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    title: dataValues.title,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, routineTypeRepository }) => {
  const newRegister = await routineTypeRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, routineTypeRepository, includeDeleted = true }) => {
  const dataFound = await routineTypeRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, routineTypeRepository }) => {
  const dataUpdated = await routineTypeRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, routineTypeRepository }) => {
  return routineTypeRepository.logicDeleteById(id);
};

const getAll = async ({ routineTypeRepository, filters }) => {
  const listAll = await routineTypeRepository.getList(filters);
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
