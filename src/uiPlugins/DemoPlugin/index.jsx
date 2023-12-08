import { UiChangeOperation } from '../pluginSlot';

const plugin = {
  id: 'demo',
  getUiSlotChanges() {
    return {
      'side-bar-nav': [
        {
          op: UiChangeOperation.Insert,
          widget: {
            id: 'login',
            priority: 50,
            content: {
              url: '/login', icon: 'person-fill', label: 'Login',
            },
          },
        },
      ],
    };
  },
};

export default plugin;
