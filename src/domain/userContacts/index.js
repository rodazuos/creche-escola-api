const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    email: dataValues.email,
    housePhoneNumber: dataValues.housePhoneNumber || dataValues.housephonenumber,
    personalPhoneNumber: dataValues.personalPhoneNumber || dataValues.personalphonenumber,
    commercialPhoneNumber: dataValues.commercialPhoneNumber || dataValues.commercialphonenumber,
    contactDescription: dataValues.contactDescription || dataValues.contactdescription,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, userContactsRepository }) => {
  const newRegister = await userContactsRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, userContactsRepository, includeDeleted = true }) => {
  const dataFound = await userContactsRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, userContactsRepository }) => {
  const dataUpdated = await userContactsRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, userContactsRepository }) => {
  return userContactsRepository.logicDeleteById(id);
};

const getAll = async ({ userContactsRepository, filters }) => {
  const listAll = await userContactsRepository.getList(filters);
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
