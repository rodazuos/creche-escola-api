const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idUser: dataValues.idUser || dataValues.iduser,
    userName: dataValues.userName || dataValues.username,
    idStudent: dataValues.idStudent || dataValues.idstudent,
    studentName: dataValues.studentName || dataValues.studentname,
    medicament: dataValues.medicament,
    dosage: dataValues.dosage,
    description: dataValues.description,
    startTime: dataValues.startTime || dataValues.starttime,
    endTime: dataValues.endTime || dataValues.endtime,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentMedicamentRepository }) => {
  const newRegister = await studentMedicamentRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentMedicamentRepository, includeDeleted = true }) => {
  const dataFound = await studentMedicamentRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentMedicamentRepository }) => {
  const dataUpdated = await studentMedicamentRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentMedicamentRepository }) => {
  return studentMedicamentRepository.logicDeleteById(id);
};

const getAll = async ({ studentMedicamentRepository, filters }) => {
  const listAll = await studentMedicamentRepository.getList(filters);
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
