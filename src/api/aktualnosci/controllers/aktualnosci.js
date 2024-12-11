'use strict';

/**
 * aktualnosci controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::aktualnosci.aktualnosci', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params; 
    const { query } = ctx; 

 
    const entity = await strapi.entityService.findMany('api::aktualnosci.aktualnosci', {
      filters: { slug: id },
      ...query, 
    });


    if (!entity || entity.length === 0) {
      return ctx.notFound('Nie znaleziono szlaku z podanym slugiem');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity[0], ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));