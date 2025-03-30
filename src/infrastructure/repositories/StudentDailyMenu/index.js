const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.student_daily_menu;
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
    let query = ` select sdm.id, 
                  sdm.id_student_daily as studentDaily, sd.date_daily as dateDaily,
                  sdm.id_menu_class_school_year as idMenuClassSchoolYear, sdm.id_menu_class as idMenuClass,
                  mc.name_menu as nameMenu, mc.description as descriptionMenu, mc.hour_menu as hourMenu,
                  sdm.id_consumed_type_menu as idConsumedTypeMenu, ctm.title,
                  sdm.description,
                  sdm.deleted_at as deletedAt
                  from student_daily_menu sdm
                    inner join student_daily sd on sdm.id_student_daily = sd.id
                    inner join menu_class_school_year mcsy on sdm.id_menu_class_school_year = mcsy.id
                    inner join consumed_type_menu ctm on sdm.id_consumed_type_menu = ctm.id
                    inner join menu_class mc on mcsy.id_menu_class = mc.id
                `;
    if (hasTotal) {
      query = `select count(distinct sdm.id) as total from student_daily_menu sdm
                  inner join student_daily sd on sdm.id_student_daily = sd.id
                  inner join menu_class_school_year mcsy on sdm.id_menu_class_school_year = mcsy.id
                  inner join consumed_type_menu ctm on sdm.id_consumed_type_menu = ctm.id
                  inner join menu_class mc on mcsy.id_menu_class = mc.id
      `;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.idStudentDaily) {
        queryFilters.push(` id_student_daily = ${filters.idStudentDaily}`);
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by date_daily ASC limit ${limit} offset ${offset};`;
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
