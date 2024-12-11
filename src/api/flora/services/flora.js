'use strict';

/**
 * flora service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flora.flora');
