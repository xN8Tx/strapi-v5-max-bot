import { PLUGIN_ID } from '../constants';

export default {
  kind: 'collectionType',
  collectionName: `${PLUGIN_ID}-user`,
  info: {
    singularName: `${PLUGIN_ID}-user`,
    pluralName: `${PLUGIN_ID}-users`,
    displayName: 'Users for max',
    description: 'Setup your max bot users here.',
  },
  attributes: {
    title: {
      type: 'string',
      require: false,
    },
    chatId: {
      type: 'string',
      unique: true,
      required: true,
      configurable: false,
      minLength: 1,
    },
  },
};
