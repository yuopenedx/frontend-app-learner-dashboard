import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import RecommendationsPanel from 'widgets/RecommendationsPanel';
import hooks from 'widgets/ProductRecommendations/hooks';
import PluginSlot from '../../../../plugins/PluginSlot';

export const WidgetSidebar = ({ setSidebarShowing }) => {
  const { inRecommendationsVariant, isExperimentActive } = hooks.useShowRecommendationsFooter();
  const [showPlugin, setShowPlugin] = useState(false);

  if (!inRecommendationsVariant && isExperimentActive) {
    setSidebarShowing(true);

    return (
      <div className="widget-sidebar px-2">
        <div className="d-flex">
          {/* <RecommendationsPanel /> */}
          <PluginSlot
            id="example" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
            className="d-flex flex-column"
            pluginProps={{
              className: 'flex-grow-1',
              title: 'example plugins',
            }}
            style={{
              height: 700,
            }}
          />
          {/* <PluginSlot
            id="example2" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
            className="d-flex flex-column"
            pluginProps={{
              className: 'flex-grow-1',
              title: 'example plugins',
            }}
            style={{
              height: 400,
            }}
          /> */}
          {/* <button type="button" onClick={() => setShowPlugin(prev => !prev)}>Click me</button>
          {showPlugin && (
            <PluginSlot
              id="example" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
              className="d-flex flex-column"
              pluginProps={{
                className: 'flex-grow-1',
                title: 'example plugins',
              }}
              style={{
                height: 700,
              }}
            />
            // <PluginSlot
            //   id="example2" // this is how PluginSlot knows which set of plugin URLs to grab from JS config
            //   className="d-flex flex-column"
            //   pluginProps={{
            //     className: 'flex-grow-1',
            //     title: 'example plugins',
            //   }}
            //   style={{
            //     height: 400,
            //   }}
            // />
          )} */}
        </div>
      </div>
    );
  }

  return null;
};

WidgetSidebar.propTypes = {
  setSidebarShowing: PropTypes.func.isRequired,
};

export default WidgetSidebar;
