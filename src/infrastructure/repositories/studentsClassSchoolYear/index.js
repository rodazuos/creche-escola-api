const { NotFoundException, InternalServerException } = require("../../../infrastructure/errors");

module.exports = (dbContext) => {
  const model = dbContext.models.students_class_school_year;
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
      throw NotFoundException("Nenhuma notificação encontrada!");
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
      throw NotFoundException("Nenhuma notificação encontrada!");
    }

    const { dataValues } = await entityToUpdated.update(data);
    return dataValues;
  };

  const logicDeleteById = async (id) => {
    const entity = await model.findOne({
      where: { [Op.and]: [{ id }, notDeletedClause] },
    });

    if (!entity) {
      throw NotFoundException("Nenhuma notificação encontrada!");
    }

    const { dataValues } = await entity.update({
      deletedAt: dbContext.sequelize.literal("timezone('utc', now())"),
    });

    return dataValues;
  };

  const getList = async (filters) => {
    const queryResult = await rawSelectQuery(prepareQuerySearch(filters));

    if (!queryResult) {
      throw NotFoundException("Nenhuma notificação encontrada!");
    }

    const queryTotalResult = await rawSelectQuery(prepareQuerySearch(filters, true));

    return {
      total: parseInt(queryTotalResult[0].total),
      page: filters.page || 1,
      queryResult,
    };
  };

  const prepareQuerySearch = (filters, hasTotal) => {
    let query = ` select scsy.id, scsy.id_class_school_year as idClassSchoolYear, csy.school_year as schoolYear,
                  csy.id_students_class as idStudentsClass, sc.class_name as className, sc.description,
                  scsy.id_student as idStudent, s.student_name as studentName,
                  scsy.deleted_at as deletedAt
                  from students_class_school_year scsy
                    inner join class_school_year csy on scsy.id_class_school_year = csy.id
                    inner join student s on scsy.id_student = s.id
                    inner join students_class sc on csy.id_students_class = sc.id
                `;
    if (hasTotal) {
      query = `select count(distinct csy.id) as total from students_class_school_year scsy 
                  inner join class_school_year csy on scsy.id_class_school_year = csy.id
                  inner join student s on scsy.id_student = s.id
                  inner join students_class sc on csy.id_students_class = sc.id
      `;
    }

    if (filters) {
      let queryFilters = [];
      if (filters.idStudentsClass) {
        queryFilters.push(` sc.id = ${filters.idStudentsClass}`);
      }

      if (filters.idStudent) {
        queryFilters.push(` s.id = ${filters.idStudent}`);
      }

      if (filters.schoolYear) {
        queryFilters.push(` csy.school_year = ${filters.schoolYear}`);
      }

      if (queryFilters.length > 0) {
        query = query + " where " + queryFilters.join(" AND ");
      }

      const limit = filters.limit ? filters.limit : 10;
      const offset = filters.page && filters.page > 1 ? (filters.page - 1) * limit : 0;

      if (!hasTotal) {
        query = query + ` order by sc.class_name, s.student_name  ASC limit ${limit} offset ${offset};`;
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
