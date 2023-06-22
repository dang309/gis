'use strict';

/**
 * geometry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::geometry.geometry');
