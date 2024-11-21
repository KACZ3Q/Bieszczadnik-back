import type { Schema, Attribute } from '@strapi/strapi';

export interface TrasaMapa extends Schema.Component {
  collectionName: 'components_trasa_mapas';
  info: {
    displayName: 'Mapa';
    icon: 'pinMap';
  };
  attributes: {
    Szlak: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps.location-picker'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'trasa.mapa': TrasaMapa;
    }
  }
}
