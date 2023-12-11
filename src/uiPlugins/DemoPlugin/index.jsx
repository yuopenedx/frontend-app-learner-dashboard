// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectPluginOperations } from '@edx/frontend-plugin-framework/src/plugins/directPlugins';

const plugin = {
  id: 'demo',
  getDirectSlotChanges() {
    return {
      'course-list': [
        {
          op: DirectPluginOperations.Insert,
          widget: {
            id: 'login',
            priority: 1,
            content: '******* this is a string we put in',
          },
        },
      ],
    };
  },
};

export default plugin;
