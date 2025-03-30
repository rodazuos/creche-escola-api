const { ConflictException } = require("../../infrastructure/errors");

const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    schoolYear: dataValues.schoolYear || dataValues.schoolyear,
    idStudentsClass: dataValues.idStudentsClass || dataValues.idstudentsclass,
    className: dataValues.className || dataValues.classname,
    startTime: dataValues.startTime || dataValues.starttime,
    endTime: dataValues.endTime || dataValues.endtime,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, classSchoolYearRepository }) => {
  let exitsRegister = null;
  try {
    exitsRegister = await classSchoolYearRepository.findByYearAndClass(
      sanitizedData.schoolYear,
      sanitizedData.idStudentsClass
    );
  } catch (error) {
    // continue because this error is register not exists
  }

  if (exitsRegister) {
    throw ConflictException("Turma já cadastrada!");
  }

  const newRegister = await classSchoolYearRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, classSchoolYearRepository, includeDeleted = true }) => {
  const student = await classSchoolYearRepository.getById(id, { includeDeleted });
  return dto(student);
};

const update = async ({ sanitizedData, classSchoolYearRepository }) => {
  const dataUpdated = await classSchoolYearRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, classSchoolYearRepository }) => {
  return classSchoolYearRepository.logicDeleteById(id);
};

const getAll = async ({ classSchoolYearRepository, filters }) => {
  const listAll = await classSchoolYearRepository.getList(filters);
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
