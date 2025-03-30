const { NotFoundException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.kindergarten;
  const { Op } = dbContext.sequelize;
  const notDeletedClause = { deletedAt: null };

  const getById = async (id, { includeDeleted = false } = {}) => {
    const whereConditions = includeDeleted ? { id } : { [Op.and]: [{ id }, notDeletedClause] };
    const queryResult = await model.findOne({ where: whereConditions });

    if (!queryResult) {
      throw NotFoundException("Nenhuma creche encontrada!");
    }

    const { dataValues } = queryResult;

    return dataValues;
  };

  const update = async (data) => {
    data.updatedAt = dbContext.sequelize.literal("timezone('utc', now())");

    if (data.active) {
      data.deletedAt = null;
    } else {
      data.deletedAt = dbContext.sequelize.literal("timezone('utc', now())");
    }

    const whereConditions = {
      [Op.and]: [{ id: data.id }],
    };
    const entityToUpdated = await model.findOne({ where: whereConditions });
    if (!entityToUpdated) {
      throw NotFoundException("Creche não encontrada!");
    }

    const { dataValues } = await entityToUpdated.update(data);
    return dataValues;
  };

  return {
    getById,
    update,
  };
};
