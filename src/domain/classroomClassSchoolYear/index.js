const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idClassroom: dataValues.idClassroom || dataValues.idclassroom,
    title: dataValues.title,
    description: dataValues.description,
    teacher: dataValues.teacher,
    idClassSchoolYear: dataValues.idClassSchoolYear || dataValues.idclassschoolyear,
    schoolYear: dataValues.schoolYear || dataValues.schoolyear,
    idStudentsClass: dataValues.idStudentsClass || dataValues.idstudentsclass,
    className: dataValues.className || dataValues.classname,
    weekday: dataValues.weekday,
    startTime: dataValues.startTime || dataValues.starttime,
    endTime: dataValues.endTime || dataValues.endtime,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, classroomClassSchoolYearRepository }) => {
  const newRegister = await classroomClassSchoolYearRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, classroomClassSchoolYearRepository, includeDeleted = true }) => {
  const dataFound = await classroomClassSchoolYearRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, classroomClassSchoolYearRepository }) => {
  const dataUpdated = await classroomClassSchoolYearRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, classroomClassSchoolYearRepository }) => {
  return classroomClassSchoolYearRepository.logicDeleteById(id);
};

const getAll = async ({ classroomClassSchoolYearRepository, filters }) => {
  const listAll = await classroomClassSchoolYearRepository.getList(filters);
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
