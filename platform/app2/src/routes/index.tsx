import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@ohif/ui';

// Route Components
import DataSourceWrapper from './DataSourceWrapper';
import WorkList from './WorkList';
import { Home } from '../pages';
import Local from './Local';
import Debug from './Debug';
import NotFound from './NotFound';
import buildModeRoutes from './buildModeRoutes';
import PrivateRoute from './PrivateRoute';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotFoundServer = ({
  message = 'Unable to query for studies at this time. Check your data source configuration or network connection',
}) => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center text-white">
      <div>
        <h4>{message}</h4>
      </div>
    </div>
  );
};

NotFoundServer.propTypes = {
  message: PropTypes.string,
};

const NotFoundStudy = () => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center text-white">
      <div>
        <h4>
          One or more of the requested studies are not available at this time.
          Return to the{' '}
          <Link className="text-primary-light" to={'/'}>
            study list
          </Link>{' '}
          to select a different study to view.
        </h4>
      </div>
    </div>
  );
};

NotFoundStudy.propTypes = {
  message: PropTypes.string,
};

// TODO: Include "routes" debug route if dev build
const bakedInRoutes = [
  {
    path: '/notfoundserver',
    children: NotFoundServer,
  },
  {
    path: '/notfoundstudy',
    children: NotFoundStudy,
  },
  {
    path: '/debug',
    children: Debug,
  },
];

// NOT FOUND (404)
const notFoundRoute = { component: NotFound };

const createRoutes = ({
  extensionManager,
  servicesManager,
  commandsManager,
  hotkeysManager,
}) => {
  const routes =[];
  const HomeRoute = {
    path: '/',
    private: true,
    props: { children: Home, servicesManager, extensionManager },
  };

  const allRoutes = [
    ...routes,
    ...([HomeRoute]),
    ...bakedInRoutes,
    notFoundRoute,
  ];

  function RouteWithErrorBoundary({ route, ...rest }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <ErrorBoundary context={`Route ${route.path}`} fallbackRoute="/">
        <route.children
          {...rest}
          {...route.props}
          route={route}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          hotkeysManager={hotkeysManager}
        />
      </ErrorBoundary>
    );
  }

  const { userAuthenticationService } = servicesManager.services;

  // Note: PrivateRoutes in react-router-dom 6.x should be defined within
  // a Route element
  return (
    <Routes>
      {allRoutes.map((route, i) => {
        return route.private === true ? (
          <Route
            key={i}
            exact
            path={route.path}
            element={
              <PrivateRoute
                handleUnauthenticated={
                  userAuthenticationService.handleUnauthenticated
                }
              >
                <RouteWithErrorBoundary route={route} />
              </PrivateRoute>
            }
          ></Route>
        ) : (
          <Route
            key={i}
            path={route.path}
            element={<RouteWithErrorBoundary route={route} />}
          />
        );
      })}
    </Routes>
  );
};

export default createRoutes;
