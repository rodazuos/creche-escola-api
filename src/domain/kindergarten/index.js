const dtoKindergarten = (dataValues) => {
  const deletedAt = dataValues.deletedAt || dataValues.deletedat;
  return {
    id: dataValues.id,
    cnpj: dataValues.cnpj,
    kindergartenName: dataValues.kindergartenName,
    description: dataValues.description,
    photo: dataValues.photo,
    instagram: dataValues.instagram,
    active: deletedAt === null || deletedAt === undefined,
  };
};

const getById = async ({ id, kindergartenRepository, includeDeleted = true }) => {
  const user = await kindergartenRepository.getById(id, { includeDeleted });
  return dtoKindergarten(user);
};

const update = async ({ sanitazedData, kindergartenRepository }) => {
  const user = await kindergartenRepository.update(sanitazedData);
  return dtoKindergarten(user);
};

module.exports = {
  getById,
  update,
};
