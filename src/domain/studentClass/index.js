const { ConflictException } = require("../../infrastructure/errors");

const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    name: dataValues.className || dataValues.classname,
    photo: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentClassRepository }) => {
  let exitsRegister = null;
  try {
    exitsRegister = await studentClassRepository.findByClassName(sanitizedData.className);
  } catch (error) {
    // continue because this error is register not exists
  }

  if (exitsRegister.length > 0) {
    throw ConflictException("Turma já cadastrada!");
  }

  const newRegister = await studentClassRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentClassRepository, includeDeleted = true }) => {
  const student = await studentClassRepository.getById(id, { includeDeleted });
  return dto(student);
};

const update = async ({ sanitizedData, studentClassRepository }) => {
  const dataUpdated = await studentClassRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentClassRepository }) => {
  return studentClassRepository.logicDeleteById(id);
};

const getAll = async ({ studentClassRepository, filters }) => {
  const listStudentsClass = await studentClassRepository.getList(filters);
  listStudentsClass.queryResult = listStudentsClass.queryResult.map((studentClass) => dto(studentClass));
  return listStudentsClass;
};

module.exports = {
  create,
  update,
  deleteLogic,
  getById,
  getAll,
};
