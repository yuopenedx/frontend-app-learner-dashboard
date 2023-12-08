import React from 'react';
import PropTypes from 'prop-types';

const UISlot = (defaultContents, slotId, renderWidget) => {
  const enabledPlugins = React.useContext(UiPluginsContext);

  const contents = React.useMemo(() => {
    for (const p of enabledPlugins) {
      const changes = p.getUiSlotChanges( ... ); // Optional: Pass in any app-specific context that the plugin may want
      for (const change of (changes[slotId] ?? [])) {
        if (change.op === UiChangeOperation.Insert) {
          contents.push(change.widget);
        } else if (change.op === UiChangeOperation.Hide) {
          const widget = contents.find((w) => w.id === change.widgetId);
          if (widget) { widget.hidden = true; }
      } else if (change.op === UiChangeOperation.Modify) {
          const widgetIdx = contents.findIndex((w) => w.id === change.widgetId);
          if (widgetIdx >= 0) {
              const widget = {...contents[widgetIdx]};
              contents[widgetIdx] = change.fn(widget)
          }
      } else if (change.op === UiChangeOperation.Wrap) {
          const widgetIdx = contents.findIndex((w) => w.id === change.widgetId);
          if (widgetIdx >= 0) {
              const newWidget = {wrappers: [], ...contents[widgetIdx]}; //refactor suggestion: remove bottom line and write wrappers: [change.wrapper]
              newWidget.wrappers.push(change.wrapper);
              contents[widgetIdx] = newWidget;
          }
      } else {
          throw new Error(`unknown plugin UI change operation: ${(change).op}`);
      }
      }
    }
    // Sort first by priority, then by ID
    contents.sort((a, b) => (a.priority - b.priority) * 10_000 + a.id.localeCompare(b.id));
    return contents;
  });

  return (
    <>
        {contents.map((c) =>
            c.hidden ? null :
            c.wrappers ? (
                c.wrappers.reduce((widget, wrapper) =>
                    React.createElement(wrapper, {widget, key: c.id}), props.renderWidget(c)
                )
            )
            : props.renderWidget(c)
        )}
    </>
  );
};

UISlot.propTypes = {
  defaultContents: PropTypes.shape([]),
  slotId: PropTypes.string.isRequired,
  renderWidget: PropTypes.func.isRequired,
};

UISlot.defaultProps = {
  defaultContents: [],
};

export default UISlot;