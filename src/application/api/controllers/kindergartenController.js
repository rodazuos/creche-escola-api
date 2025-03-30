const { OK } = require("http-status");
const Logger = require("../../../utils/logger");
const kindergartenDomain = require("../../../domain/kindergarten");

const { sanitizeGetById, sanitizeUpdate } = require("../forms/kindergarten");

module.exports = ({ repository }) => {
  const { kindergartenRepository } = repository;

  const getById = async (ctx) => {
    try {
      const { id } = await sanitizeGetById(ctx.request.params);
      ctx.body = await kindergartenDomain.getById({ id, kindergartenRepository });
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  const update = async (ctx) => {
    try {
      const sanitazedData = await sanitizeUpdate({
        ...ctx.request.params,
        ...ctx.request.body,
      });
      ctx.body = await kindergartenDomain.update({ sanitazedData, kindergartenRepository });
      ctx.status = OK;
    } catch (error) {
      Logger.error(error.message);
      ctx.status = error.statusCode;
      ctx.body = error.message;
    }
  };

  return {
    getById,
    update,
  };
};
