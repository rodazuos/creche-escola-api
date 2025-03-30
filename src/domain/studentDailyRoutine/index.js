const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    studentDaily: dataValues.studentDaily || dataValues.studentdaily,
    dateDaily: dataValues.dateDaily || dataValues.datedaily,
    idRoutineType: dataValues.idRoutineType || dataValues.idroutinetype,
    title: dataValues.title,
    idRoutineTypeDetail: dataValues.idRoutineTypeDetail || dataValues.idroutinetypedetail,
    titleRoutineDetail: dataValues.titleRoutineDetail || dataValues.titleroutinedetail,
    startHourRoutine: dataValues.startHourRoutine || dataValues.starthourroutine,
    endHourRoutine: dataValues.endHourRoutine || dataValues.endhourroutine,
    description: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentDailyRoutineRepository }) => {
  const newRegister = await studentDailyRoutineRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentDailyRoutineRepository, includeDeleted = true }) => {
  const dataFound = await studentDailyRoutineRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentDailyRoutineRepository }) => {
  const dataUpdated = await studentDailyRoutineRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentDailyRoutineRepository }) => {
  return studentDailyRoutineRepository.logicDeleteById(id);
};

const getAll = async ({ studentDailyRoutineRepository, filters }) => {
  const listAll = await studentDailyRoutineRepository.getList(filters);
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
