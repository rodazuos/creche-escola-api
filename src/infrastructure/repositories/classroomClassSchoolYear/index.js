const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.classroom_class_school_year;
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
    let query = ` select ccsy.id, ccsy.id_classroom as idClassroom,
                  c.title, c.description, c.teacher,
                  ccsy.id_class_school_year as idClassSchoolYear, csy.school_year as schoolYear,
                  sc.id as idStudentsClass, sc.class_name as className,
                  ccsy.weekday, ccsy.start_time as startTime, ccsy.end_time as endTime,
                  ccsy.deleted_at as deletedAt
                  from classroom_class_school_year ccsy
                    inner join classroom c on ccsy.id_classroom = c.id
                    inner join class_school_year csy on ccsy.id_class_school_year = csy.id
                    inner join students_class sc on csy.id_students_class = sc.id
                `;
    if (hasTotal) {
      query = `select count(distinct ccsy.id) as total from classroom_class_school_year ccsy
                inner join classroom c on ccsy.id_classroom = c.id
                inner join class_school_year csy on ccsy.id_class_school_year = csy.id
                inner join students_class sc on csy.id_students_class = sc.id
      `;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.title) {
        queryFilters.push(` lower(c.title) like '%${filters.title.toLowerCase()}%'`);
      }

      if (filters.teacher) {
        queryFilters.push(` lower(c.teacher) like '%${filters.teacher.toLowerCase()}%'`);
      }

      if (filters.idStudentsClass) {
        queryFilters.push(` csy.id_students_class = ${filters.idStudentsClass}`);
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by ccsy.start_time ASC limit ${limit} offset ${offset};`;
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
