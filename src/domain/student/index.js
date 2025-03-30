const { ConflictException } = require("../../infrastructure/errors");

const dtoStudent = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    cpf: dataValues.cpf,
    name: dataValues.studentName || dataValues.studentname,
    photo: dataValues.photo,
    birthdate: dataValues.birthdate,
    entryTime: dataValues.entryTime || dataValues.entrytime,
    depertureTime: dataValues.depertureTime || dataValues.deperturetime,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ studentData, studentRepository }) => {
  let student = null;
  try {
    student = await studentRepository.findByCpf(studentData.cpf);
  } catch (error) {
    // continue because this error is student not exists
  }

  if (student) {
    throw ConflictException("Aluno já cadastrado!");
  }

  const newStudent = await studentRepository.create(studentData);
  return dtoStudent(newStudent);
};

const getById = async ({ id, studentRepository, includeDeleted = true }) => {
  const student = await studentRepository.getById(id, { includeDeleted });
  return dtoStudent(student);
};

const update = async ({ studentData, studentRepository }) => {
  const user = await studentRepository.update(studentData);
  return dtoStudent(user);
};

const deleteLogicUser = async ({ id, studentRepository }) => {
  return studentRepository.logicDeleteById(id);
};

const getStudentList = async ({ studentRepository, filters }) => {
  const listStudents = await studentRepository.getListStudents(filters);
  listStudents.queryResult = listStudents.queryResult.map((student) => dtoStudent(student));
  return listStudents;
};

module.exports = {
  create,
  update,
  deleteLogicUser,
  getById,
  getStudentList,
};
