const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    nameMenu: dataValues.nameMenu || dataValues.namemenu,
    description: dataValues.description,
    hourMenu: dataValues.hourMenu || dataValues.hourmenu,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, menuClassRepository }) => {
  const newRegister = await menuClassRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, menuClassRepository, includeDeleted = true }) => {
  const dataFound = await menuClassRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, menuClassRepository }) => {
  const dataUpdated = await menuClassRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, menuClassRepository }) => {
  return menuClassRepository.logicDeleteById(id);
};

const getAll = async ({ menuClassRepository, filters }) => {
  const listAll = await menuClassRepository.getList(filters);
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
