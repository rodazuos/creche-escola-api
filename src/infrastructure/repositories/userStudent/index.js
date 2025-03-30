const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.user_student;
  const { Op } = dbContext.sequelize;
  const notDeletedClause = { deletedAt: null };
  const rawSelectQuery = dbContext.rawSelectQuery;

  const create = async (data) => {
    try {
      const { dataValues } = await model.create(data);
      return dataValues;
    } catch (error) {
      throw InternalServerException(error.message);
    }
  };

  const update = async (data) => {
    data.updatedAt = dbContext.sequelize.literal("timezone('utc', now())");

    if (data.active) {
      data.deletedAt = null;
    } else {
      data.deletedAt = dbContext.sequelize.literal("timezone('utc', now())");
    }

    const whereConditions = {
      [Op.and]: [{ idUser: data.idUser }, { idStudent: data.idStudent }],
    };
    const entityToUpdated = await model.findOne({ where: whereConditions });
    if (!entityToUpdated) {
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const { dataValues } = await entityToUpdated.update(data);
    return dataValues;
  };

  const logicDeleteById = async ({ idUser, idStudent }) => {
    const entity = await model.findOne({
      where: { [Op.and]: [{ idUser }, { idStudent }, notDeletedClause] },
    });

    if (!entity) {
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const { dataValues } = await entity.update({
      deletedAt: dbContext.sequelize.literal("timezone('utc', now())"),
    });

    return dataValues;
  };

  const getListStudentsByIdUser = async (idUser, includeDeleted = false) => {
    const filters = {
      idUser,
      includeDeleted,
    };

    const queryResult = await rawSelectQuery(prepareQuerySearch(filters));

    if (!queryResult) {
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const queryTotalResult = await rawSelectQuery(prepareQuerySearch(filters, true));

    return {
      total: parseInt(queryTotalResult[0].total),
      page: filters.page || 1,
      queryResult,
    };
  };

  const getListUsersByIdStudent = async (idStudent, includeDeleted = true) => {
    const filters = {
      idStudent,
      includeDeleted,
    };
    const queryResult = await rawSelectQuery(prepareQuerySearch(filters));

    if (!queryResult) {
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const queryTotalResult = await rawSelectQuery(prepareQuerySearch(filters, true));

    return {
      total: parseInt(queryTotalResult[0].total),
      page: filters.page || 1,
      queryResult,
    };
  };

  const prepareQuerySearch = (filters, hasTotal) => {
    let query = ` select us.id_user as idUser, u.user_name as userName, us.id_student as idStudent, s.student_name as studentName, 
                  us.can_pick_up as canPickUp, us.receive_notification as receiveNotification, us.deleted_at as deletedAt
                  from user_student us
                    inner join users u on us.id_user = u.id
                    inner join student s on us.id_student = s.id
                `;
    if (hasTotal) {
      query = `select count(distinct id_student) as total from user_student us `;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.idUser) {
        queryFilters.push(` us.id_user = ${filters.idUser}`);
      }

      if (filters.idStudent) {
        queryFilters.push(` us.id_student = ${filters.idStudent}`);
      }

      if (!filters.includeDeleted) {
        queryFilters.push(" us.deleted_at is null");
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by u.user_name ASC limit ${limit} offset ${offset};`;
      }
    }

    return query;
  };

  return {
    create,
    update,
    logicDeleteById,
    getListStudentsByIdUser,
    getListUsersByIdStudent,
  };
};
