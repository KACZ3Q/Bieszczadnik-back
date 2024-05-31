'use strict';

/**
 * szlak controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::szlak.szlak',
    ({strapi})=>({
        async findOne(ctx){
            const {id}=ctx.params;
            const entity = await strapi.db.query('api::szlak.szlak').findOne({where:{slug: id}});
            const sanitizedEntity = await this.sanitizeOutput(entity,ctx);
            return this.transformResponse(sanitizedEntity);
        }
}));
