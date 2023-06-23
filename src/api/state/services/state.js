"use strict";

/**
 * state service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const _ = require("lodash");

module.exports = createCoreService("api::state.state", ({ strapi }) => ({
  async getCaseByDateRange(from, to) {
    const queryWhereParams = {};
    if (from && to) {
      queryWhereParams.where = {
        date: {
          $gte: from,
          $lte: to,
        },
      };
    }
    if (from) {
      queryWhereParams.where = {
        date: {
          $gte: from,
        },
      };
    }
    if (to) {
      queryWhereParams.where = {
        date: {
          $lte: to,
        },
      };
    }
    console.log({ queryWhereParams });
    let data = await strapi.db.query("api::state.state").findMany({
      populate: {
        cases: {
          ...queryWhereParams,
        },
      },
    });

    data = data.map((item) => {
      return {
        ...item,
        cases: item.cases.reduce((acc, obj) => acc + obj.infected, 0),
      };
    });

    return { data };
  },
}));
