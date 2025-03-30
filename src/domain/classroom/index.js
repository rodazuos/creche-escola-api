const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    title: dataValues.title,
    description: dataValues.description,
    teacher: dataValues.teacher,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, classroomRepository }) => {
  const newRegister = await classroomRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, classroomRepository, includeDeleted = true }) => {
  const dataFound = await classroomRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, classroomRepository }) => {
  const dataUpdated = await classroomRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, classroomRepository }) => {
  return classroomRepository.logicDeleteById(id);
};

const getAll = async ({ classroomRepository, filters }) => {
  const listAll = await classroomRepository.getList(filters);
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
