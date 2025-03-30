const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    idMenuClass: dataValues.idMenuClass || dataValues.idmenuclass,
    idUserMenuClass: dataValues.idUserMenuClass || dataValues.idusermenuclass,
    userNameMenuClass: dataValues.userNameMenuClass || dataValues.usernamemenuclass,
    nameMenu: dataValues.nameMenu || dataValues.namemenu,
    description: dataValues.description,
    hourMenu: dataValues.hourMenu || dataValues.hourmenu,
    idClassSchoolYear: dataValues.idClassSchoolYear || dataValues.idclassschoolyear,
    schoolYear: dataValues.schoolYear || dataValues.schoolyear,
    idStudentsClass: dataValues.idStudentsClass || dataValues.idstudentsclass,
    className: dataValues.className || dataValues.classname,
    dateMenu: dataValues.dateMenu || dataValues.datemenu,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, menuClassSchoolYearRepository }) => {
  const newRegister = await menuClassSchoolYearRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, menuClassSchoolYearRepository, includeDeleted = true }) => {
  const dataFound = await menuClassSchoolYearRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, menuClassSchoolYearRepository }) => {
  const dataUpdated = await menuClassSchoolYearRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, menuClassSchoolYearRepository }) => {
  return menuClassSchoolYearRepository.logicDeleteById(id);
};

const getAll = async ({ menuClassSchoolYearRepository, filters }) => {
  const listAll = await menuClassSchoolYearRepository.getList(filters);
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
