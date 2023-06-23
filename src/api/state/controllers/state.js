"use strict";

/**
 * state controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::state.state", ({ strapi }) => ({
  async caseByDateRange(ctx) {
    const from = ctx.request.query.from;
    const to = ctx.request.query.to;
    const { data } = await strapi
      .service("api::state.state")
      .getCaseByDateRange(from, to);

    return { data };
  },
}));
