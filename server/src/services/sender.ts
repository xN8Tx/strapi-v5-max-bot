import type { Core } from '@strapi/strapi';

import { PLUGIN_ID } from '../constants';
import { Bot, Context } from '@maxhub/max-bot-api';
import { Update } from '@maxhub/max-bot-api/dist/core/network/api';

const sender = ({ strapi }: { strapi: Core.Strapi }) => ({
  token: null,
  bot: null as Bot<Context<Update>> | null,
  chatIds: [],

  async setupBot() {
    try {
      if (!this.token) {
        const isTokenSet = await this.setId();
        if (!isTokenSet) return;
      }

      this.bot = new Bot(this.token);

      this.bot.command('start', (ctx) => {
        // @ts-ignore
        console.log(ctx.chatId);
        // @ts-ignore
        ctx.reply(
          // @ts-ignore
          `Ваш ID: ${ctx?.message?.recipient?.user_id}\nChat ID: ${ctx?.chatId}`
        );
      });

      this.bot.start();
    } catch (error) {
      strapi.log.error(error);
    }
  },

  async setId() {
    try {
      const tokenResponse = await strapi
        .documents(`plugin::${PLUGIN_ID}.${PLUGIN_ID}-token`)
        .findMany();

      if (!tokenResponse || tokenResponse.length === 0) {
        strapi.log.error(
          `Max bot token for plugin ${PLUGIN_ID} is not configured. Please configure it in the Strapi admin panel.`
        );

        this.token = null;
        return false;
      }

      this.token = tokenResponse[0].key;
      return true;
    } catch (error) {
      strapi.log.error(error);
    }
  },

  async setChatIds() {
    try {
      const usersResponse = await strapi
        .documents(`plugin::${PLUGIN_ID}.${PLUGIN_ID}-user`)
        .findMany();

      if (!usersResponse || usersResponse.length === 0) {
        strapi.log.error(
          `Max bot users for plugin ${PLUGIN_ID} is not configured. Please configure it in the Strapi admin panel.`
        );

        this.chatIds = [];
        return false;
      }

      this.chatIds = usersResponse.map((el) => el.chatId);
      return true;
    } catch (error) {
      strapi.log.error(error);
    }
  },

  async sendMessage(message: string) {
    try {
      if (!this.bot) {
        this.setupBot();
      }

      if (this.chatIds.length === 0) {
        const isUsersSet = await this.setChatIds();
        if (!isUsersSet) return;
      }

      const requests = this.chatIds.map(async (el) => {
        await this.bot.api.sendMessageToChat(el, message);
      });

      return await Promise.allSettled(requests);
    } catch (error) {
      strapi.log.error(error);
    }
  },

  async stopBot() {
    try {
      if (!this.bot) return;
      this.bot.stop();
    } catch (error) {
      strapi.log.error(error);
    }
  },
});

export default sender;
