const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    studentDaily: dataValues.studentDaily || dataValues.studentdaily,
    dateDaily: dataValues.dateDaily || dataValues.datedaily,
    idMenuClassSchoolYear: dataValues.idMenuClassSchoolYear || dataValues.idmenuclassschoolyear,
    idMenuClass: dataValues.idMenuClass || dataValues.idmenuclass,
    nameMenu: dataValues.nameMenu || dataValues.namemenu,
    descriptionMenu: dataValues.descriptionMenu || dataValues.descriptionmenu,
    hourMenu: dataValues.hourMenu || dataValues.hourmenu,
    idConsumedTypeMenu: dataValues.idConsumedTypeMenu || dataValues.idconsumedtypemenu,
    title: dataValues.title,
    description: dataValues.description,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, studentDailyMenuRepository }) => {
  const newRegister = await studentDailyMenuRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, studentDailyMenuRepository, includeDeleted = true }) => {
  const dataFound = await studentDailyMenuRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, studentDailyMenuRepository }) => {
  const dataUpdated = await studentDailyMenuRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, studentDailyMenuRepository }) => {
  return studentDailyMenuRepository.logicDeleteById(id);
};

const getAll = async ({ studentDailyMenuRepository, filters }) => {
  const listAll = await studentDailyMenuRepository.getList(filters);
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
