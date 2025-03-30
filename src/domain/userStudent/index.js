const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    idUser: dataValues.idUser || dataValues.iduser,
    userName: dataValues.username || dataValues.userName,
    idStudent: dataValues.idStudent || dataValues.idstudent,
    studentName: dataValues.studentname || dataValues.studentName,
    canPickUp: dataValues.canPickUp || dataValues.canpickup,
    receiveNotification: dataValues.receiveNotification || dataValues.receivenotification,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, userStudentRepository }) => {
  const newRegister = await userStudentRepository.create(sanitizedData);
  return dto(newRegister);
};

const update = async ({ sanitizedData, userStudentRepository }) => {
  const dataUpdated = await userStudentRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ sanitizedData, userStudentRepository }) => {
  const { idUser, idStudent } = sanitizedData;
  return userStudentRepository.logicDeleteById({ idUser, idStudent });
};

const getStudentsByIdUser = async ({ userStudentRepository, idUser }) => {
  const listAll = await userStudentRepository.getListStudentsByIdUser(idUser);
  listAll.queryResult = listAll.queryResult.map((dataList) => dto(dataList));
  return listAll;
};

const getUsersByIdStudent = async ({ userStudentRepository, idStudent }) => {
  const listAll = await userStudentRepository.getListUsersByIdStudent(idStudent);
  listAll.queryResult = listAll.queryResult.map((dataList) => dto(dataList));
  return listAll;
};

module.exports = {
  create,
  update,
  deleteLogic,
  getStudentsByIdUser,
  getUsersByIdStudent,
};
