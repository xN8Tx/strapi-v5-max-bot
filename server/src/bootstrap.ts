import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './constants';

const registerPermissionActions = async () => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access to Max bot',
      uid: 'read',
      pluginName: PLUGIN_ID,
    },
  ];

  await strapi.service('admin::permission').actionProvider.registerMany(actions);
};

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  await registerPermissionActions();

  const sender = strapi.plugin(PLUGIN_ID).service('sender');

  sender.setupBot();

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-token`],
    async afterCreate() {
      await sender.setId();
    },
    async afterUpdate() {
      await sender.setId();
    },
    async afterDelete() {
      await sender.setId();
    },
  });

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-user`],
    async afterCreate() {
      await sender.setChatIds();
    },
    async afterUpdate() {
      await sender.setChatIds();
    },
    async afterDelete() {
      await sender.setChatIds();
    },
  });
};

export default bootstrap;
