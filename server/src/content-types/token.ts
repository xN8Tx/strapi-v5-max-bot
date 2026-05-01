import { PLUGIN_ID } from '../constants';

export default {
  kind: 'singleType',
  collectionName: `${PLUGIN_ID}-token`,
  info: {
    singularName: `${PLUGIN_ID}-token`,
    pluralName: `${PLUGIN_ID}-tokens`,
    displayName: 'Token for max',
    description: 'Setup your max bot token here.',
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    key: {
      type: 'string',
      required: true,
      minLength: 30,
      configurable: false,
    },
  },
};
