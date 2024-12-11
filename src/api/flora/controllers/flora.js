'use strict';

/**
 * flora controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::flora.flora', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params; 
    const { query } = ctx; 

 
    const entity = await strapi.entityService.findMany('api::flora.flora', {
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