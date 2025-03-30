const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    eventDate: dataValues.eventDate || dataValues.eventdate,
    title: dataValues.title,
    description: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, calendarRepository }) => {
  const newRegister = await calendarRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, calendarRepository, includeDeleted = true }) => {
  const dataFound = await calendarRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, calendarRepository }) => {
  const dataUpdated = await calendarRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, calendarRepository }) => {
  return calendarRepository.logicDeleteById(id);
};

const getAll = async ({ calendarRepository, filters }) => {
  const listAll = await calendarRepository.getList(filters);
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
