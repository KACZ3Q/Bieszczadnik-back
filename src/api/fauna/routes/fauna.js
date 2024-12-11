'use strict';

/**
 * fauna router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fauna.fauna');
