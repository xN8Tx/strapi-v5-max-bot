import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';

import { PLUGIN_ID } from '../constants';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async sendMessage(ctx: Context) {
    const body = ctx.request.body;

    if (!body) {
      return ctx.notImplemented();
    }

    const sender = strapi.plugin(PLUGIN_ID).service('sender');
    const res = await sender.sendMessage(body.message);

    return (ctx.body = { data: res });
  },
});
