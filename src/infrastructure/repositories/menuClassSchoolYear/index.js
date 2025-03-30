const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.menu_class_school_year;
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

  const getById = async (id, { includeDeleted = false } = {}) => {
    const whereConditions = includeDeleted ? { id } : { [Op.and]: [{ id }, notDeletedClause] };
    const queryResult = await model.findOne({ where: whereConditions });

    if (!queryResult) {
      throw NotFoundException("Nenhum registro encontrado!");
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
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const { dataValues } = await entityToUpdated.update(data);
    return dataValues;
  };

  const logicDeleteById = async (id) => {
    const entity = await model.findOne({
      where: { [Op.and]: [{ id }, notDeletedClause] },
    });

    if (!entity) {
      throw NotFoundException("Nenhum registro encontrado!");
    }

    const { dataValues } = await entity.update({
      deletedAt: dbContext.sequelize.literal("timezone('utc', now())"),
    });

    return dataValues;
  };

  const getList = async (filters) => {
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
    let query = ` select mcsy.id, mcsy.id_menu_class as idMenuClass,
                  mc.id_user as idUserMenuClass, u.user_name as userNameMenuClass, mc.name_menu as nameMenu, mc.description, mc.hour_menu as hourMenu,
                  mcsy.id_class_school_year as idClassSchoolYear,
                  csy.school_year as schoolYear, csy.id_students_class as idStudentsClass,
                  sc.class_name as className,
                  mcsy.date_menu as dateMenu,
                  mcsy.deleted_at as deletedAt
                  from menu_class_school_year mcsy
                    inner join menu_class mc on mcsy.id_menu_class = mc.id
                    inner join users u on mc.id_user = u.id
                    inner join class_school_year csy on mcsy.id_class_school_year = csy.id
                    inner join students_class sc on csy.id_students_class = sc.id
                `;
    if (hasTotal) {
      query = `select count(distinct mcsy.id) as total from menu_class_school_year mcsy
                  inner join menu_class mc on mcsy.id_menu_class = mc.id
                  inner join users u on mc.id_user = u.id
                  inner join class_school_year csy on mcsy.id_class_school_year = csy.id
                  inner join students_class sc on csy.id_students_class = sc.id
      `;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.dateMenu) {
        queryFilters.push(` mcsy.date_menu = ${filters.dateMenu}`);
      }

      if (filters.idStudentsClass) {
        queryFilters.push(` sc.id = ${filters.idStudentsClass}`);
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by mc.hour_menu ASC limit ${limit} offset ${offset};`;
      }
    }

    return query;
  };

  return {
    create,
    getById,
    update,
    logicDeleteById,
    getList,
  };
};
