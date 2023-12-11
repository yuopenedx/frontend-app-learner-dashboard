import React from 'react';

import { reduxHooks } from 'hooks';
import { RequestKeys } from 'data/constants/requests';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';
import CourseList from 'containers/CourseList';

import LoadedSidebar from 'containers/WidgetContainers/LoadedSidebar';
import NoCoursesSidebar from 'containers/WidgetContainers/NoCoursesSidebar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectPluginContext, DirectPluginSlot } from '@edx/frontend-plugin-framework/src/plugins/directPlugins';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import DemoPlugin from '../../uiPlugins/DemoPlugin';

const defaultComponent = [{ id: 'my-courses', priority: 50, content: <CourseList /> }];

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const enabledPlugins = DemoPlugin;

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          {hasAvailableDashboards && <EnterpriseDashboardModal />}
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div id="dashboard-content">
        {initIsPending
          ? (<LoadingView />)
          : (
            <DashboardLayout sidebar={hasCourses ? LoadedSidebar : NoCoursesSidebar}>
              <DirectPluginContext.Provider value={enabledPlugins}>
                <DirectPluginSlot
                  slotId="course-list"
                  defaultContents={defaultComponent}
                  renderWidget={(widget) => (
                    widget.content
                  )}
                />
              </DirectPluginContext.Provider>
            </DashboardLayout>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
