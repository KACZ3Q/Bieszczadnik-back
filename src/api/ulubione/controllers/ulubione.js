'use strict';



const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ulubione.ulubione', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;

        // Jeśli użytkownik nie jest zalogowany, zwróć błąd 401
        if (!user) {
            return ctx.unauthorized('Musisz być zalogowany, aby zobaczyć swoje ulubione.');
        }

        // Pobierz ulubione powiązane z zalogowanym użytkownikiem
        const userFavorites = await strapi.entityService.findMany('api::ulubione.ulubione', {
            filters: {
                user: {
                    id: user.id,  
                },
            },
            populate: ['szlak'], 
        });

        return userFavorites;
    },

    async create(ctx) {
        const user = ctx.state.user;

        // Jeśli użytkownik nie jest zalogowany, zwróć błąd 401
        if (!user) {
            return ctx.unauthorized('Musisz być zalogowany, aby dodać ulubione.');
        }

        // Sprawdzenie, czy w body znajduje się id szlaku
        const { szlak } = ctx.request.body.data;
        if (!szlak) {
            return ctx.badRequest('Szlak jest wymagany.');
        }

        // Sprawdzenie, czy szlak istnieje
        const foundSzlak = await strapi.entityService.findOne('api::szlak.szlak', szlak.id);
        if (!foundSzlak) {
            return ctx.notFound('Szlak nie znaleziony.');
        }

        // Sprawdzenie, czy użytkownik nie ma już tego samego rekordu
        const existingFavorite = await strapi.entityService.findMany('api::ulubione.ulubione', {
            filters: {
                user: user.id,
                szlak: szlak.id,
            },
        });

        if (existingFavorite.length > 0) {
            return ctx.badRequest('Już masz to w ulubionych.');
        }

        // Przygotowanie danych do zapisania
        const dataToCreate = {
            user: user.id,  
            szlak: foundSzlak,  
        };

        // Wywołanie metody 
        const response = await strapi.entityService.create('api::ulubione.ulubione', {
            data: dataToCreate,
        });

        return response;
    },

    async delete(ctx) {
        const user = ctx.state.user;
    
        // Jeśli użytkownik nie jest zalogowany, zwróć błąd 401
        if (!user) {
            return ctx.unauthorized('Musisz być zalogowany, aby usunąć ulubione.');
        }
    
        const { id } = ctx.params;
    
        // Pobierz rekord ulubionego z odpowiednimi filtrami
        const favorite = await strapi.entityService.findOne('api::ulubione.ulubione', id, {
            populate: ['user'], // Populujemy dane użytkownika
        });
    
        // Sprawdzenie, czy rekord istnieje i należy do tego użytkownika
        if (!favorite) {
            return ctx.notFound('Ulubione nie znalezione.');
        }
    
        // Upewnienie, że rekord należy do zalogowanego użytkownika
        if (favorite.user.id !== user.id) {
            return ctx.forbidden('Nie możesz usunąć czyjegoś ulubionego.');
        }
    
        // Usuwamy rekord, ponieważ użytkownik jest właścicielem
        const response = await strapi.entityService.delete('api::ulubione.ulubione', id);
    
        return response;
    },
    
}));
