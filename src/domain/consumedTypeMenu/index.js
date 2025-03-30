const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    title: dataValues.title,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, consumedTypeMenuRepository }) => {
  const newRegister = await consumedTypeMenuRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, consumedTypeMenuRepository, includeDeleted = true }) => {
  const dataFound = await consumedTypeMenuRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, consumedTypeMenuRepository }) => {
  const dataUpdated = await consumedTypeMenuRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, consumedTypeMenuRepository }) => {
  return consumedTypeMenuRepository.logicDeleteById(id);
};

const getAll = async ({ consumedTypeMenuRepository, filters }) => {
  const listAll = await consumedTypeMenuRepository.getList(filters);
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
