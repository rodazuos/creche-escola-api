const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idClassSchoolYear: dataValues.idClassSchoolYear || dataValues.idclassschoolyear,
    schoolYear: dataValues.schoolYear || dataValues.schoolyear,
    idStudentsClass: dataValues.idStudentsClass || dataValues.idstudentsclass,
    className: dataValues.className || dataValues.classname,
    description: dataValues.description,
    idStudent: dataValues.idStudent || dataValues.idstudent,
    studentName: dataValues.studentName || dataValues.studentname,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentsClassSchoolYearRepository }) => {
  const newRegister = await studentsClassSchoolYearRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentsClassSchoolYearRepository, includeDeleted = true }) => {
  const dataFound = await studentsClassSchoolYearRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentsClassSchoolYearRepository }) => {
  const dataUpdated = await studentsClassSchoolYearRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentsClassSchoolYearRepository }) => {
  return studentsClassSchoolYearRepository.logicDeleteById(id);
};

const getAll = async ({ studentsClassSchoolYearRepository, filters }) => {
  const listAll = await studentsClassSchoolYearRepository.getList(filters);
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
