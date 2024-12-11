'use strict';

/**
 * fauna service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fauna.fauna');
