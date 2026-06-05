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

  try {
    sender.setupBot();
  } catch (err) {
    strapi.log.error(err);
  }

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-token`],
    async afterCreate() {
      try {
        await sender.setId();
      } catch (err) {
        strapi.log.error(err);
      }
    },
    async afterUpdate() {
      try {
        await sender.setId();
      } catch (err) {
        strapi.log.error(err);
      }
    },
    async afterDelete() {
      try {
        await sender.setId();
      } catch (err) {
        strapi.log.error(err);
      }
    },
  });

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-user`],
    async afterCreate() {
      try {
        await sender.setChatIds();
      } catch (err) {
        strapi.log.error(err);
      }
    },
    async afterUpdate() {
      try {
        await sender.setChatIds();
      } catch (err) {
        strapi.log.error(err);
      }
    },
    async afterDelete() {
      try {
        await sender.setChatIds();
      } catch (err) {
        strapi.log.error(err);
      }
    },
  });
};

export default bootstrap;
