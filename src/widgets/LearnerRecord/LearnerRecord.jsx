import React from 'react';

import { PluginSlot } from '@edx/frontend-plugin-framework/src/plugins';

const LearnerRecord = () => (
  <PluginSlot
    id="learner_record"
    pluginProps={{
      title: 'learner record plugins',
      className: 'flex-grow-1',
    }}
    style={{
      height: 400,
    }}
  >
    <h3>====== Default content is here ======</h3>
  </PluginSlot>
);

export default LearnerRecord;
