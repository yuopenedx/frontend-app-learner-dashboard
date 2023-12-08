import { UiChangeOperation } from '../pluginSlot';

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
        {
          op: UiChangeOperation.Hide,
          widgetId: 'my-courses',
        },
      ],
    };
  },
};

export default plugin;
