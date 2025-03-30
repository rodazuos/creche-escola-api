const dto = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;

  return {
    id: dataValues.id,
    address: dataValues.address,
    addressNumber: dataValues.addressNumber || dataValues.addressnumber,
    addressComplement: dataValues.addressComplement || dataValues.addresscomplement,
    zipcode: dataValues.zipcode,
    city: dataValues.city,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const create = async ({ sanitizedData, userAddressRepository }) => {
  const newRegister = await userAddressRepository.create(sanitizedData);
  return dto(newRegister);
};

const getById = async ({ id, userAddressRepository, includeDeleted = true }) => {
  const dataFound = await userAddressRepository.getById(id, { includeDeleted });
  return dto(dataFound);
};

const update = async ({ sanitizedData, userAddressRepository }) => {
  const dataUpdated = await userAddressRepository.update(sanitizedData);
  return dto(dataUpdated);
};

const deleteLogic = async ({ id, userAddressRepository }) => {
  return userAddressRepository.logicDeleteById(id);
};

const getAll = async ({ userAddressRepository, filters }) => {
  const listAll = await userAddressRepository.getList(filters);
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
