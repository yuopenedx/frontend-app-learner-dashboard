// eslint-disable-next-line import/no-extraneous-dependencies
import { UiChangeOperation } from '@edx/frontend-plugin-framework/src/plugins';

const plugin = {
  id: 'demo',
  getUiSlotChanges() {
    return {
      'course-list': [
        {
          op: UiChangeOperation.Insert,
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
