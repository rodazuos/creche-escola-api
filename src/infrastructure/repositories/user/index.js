const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.users;
  const { Op } = dbContext.sequelize;
  const notDeletedClause = { deletedAt: null };
  const rawSelectQuery = dbContext.rawSelectQuery;

  const create = async (userData) => {
    try {
      const { dataValues } = await model.create(userData);
      return dataValues;
    } catch (error) {
      throw InternalServerException(error.message);
    }
  };

  const findByCpf = async (cpf) => {
    const whereConditions = { [Op.and]: [{ cpf }, notDeletedClause] };
    const queryResult = await model.findOne({
      where: whereConditions,
    });

    if (!queryResult) {
      throw NotFoundException("Nenhum usuário encontrado!");
    }

    const { dataValues } = queryResult;
    return dataValues;
  };

  const getById = async (id, { includeDeleted = false } = {}) => {
    const whereConditions = includeDeleted ? { id } : { [Op.and]: [{ id }, notDeletedClause] };
    const queryResult = await model.findOne({ where: whereConditions });

    if (!queryResult) {
      throw NotFoundException("Nenhum usuário encontrado!");
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
      [Op.and]: [{ id: data.id, cpf: data.cpf }],
    };
    const entityToUpdated = await model.findOne({ where: whereConditions });
    if (!entityToUpdated) {
      throw NotFoundException("Usuário não encontrado!");
    }

    const { dataValues } = await entityToUpdated.update(data);
    return dataValues;
  };

  const updatePassword = async (userModel) => {
    userModel.updatedAt = dbContext.sequelize.literal("timezone('utc', now())");

    const whereConditions = {
      [Op.and]: [{ id: userModel.id }, notDeletedClause],
    };
    const entityToUpdated = await model.findOne({ where: whereConditions });
    if (!entityToUpdated) {
      throw NotFoundException("Nenhum usuário encontrado!");
    }

    const { dataValues } = await entityToUpdated.update(userModel);
    return dataValues;
  };

  const logicDeleteById = async (id) => {
    const entity = await model.findOne({
      where: { [Op.and]: [{ id }, notDeletedClause] },
    });

    if (!entity) {
      throw NotFoundException("Usuário não encontrado!");
    }

    const { dataValues } = await entity.update({
      deletedAt: dbContext.sequelize.literal("timezone('utc', now())"),
    });

    return dataValues;
  };

  const getListUsers = async (filters) => {
    const queryResult = await rawSelectQuery(prepareQuerySearch(filters));

    if (!queryResult) {
      throw NotFoundException("Nenhum usuário encontrado!");
    }

    const queryTotalResult = await rawSelectQuery(prepareQuerySearch(filters, true));

    return {
      total: parseInt(queryTotalResult[0].total),
      page: filters.page || 1,
      queryResult,
    };
  };

  const prepareQuerySearch = (filters, hasTotal) => {
    let query = ` select u.id,  u.id_kindergarten as idKindergarten, u.id_type_account as idTypeAccount, u.cpf, u.user_name as userName, u.photo, u.access_system as accessSystem, u.deleted_at as deletedAt
                  from users u
                `;
    if (hasTotal) {
      query = `select count(distinct id) as total from users`;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.userName) {
        queryFilters.push(` lower(user_name) like '%${filters.userName.toLowerCase()}%'`);
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by user_name ASC limit ${limit} offset ${offset};`;
      }
    }

    return query;
  };

  return {
    create,
    findByCpf,
    getById,
    update,
    updatePassword,
    logicDeleteById,
    getListUsers,
  };
};
