// External
import React, { useEffect, useState } from 'react';
import Compose from './routes/Mode/Compose';
import {
  ServicesManager,
  CommandsManager,
  HotkeysManager,
  ExtensionManager,
} from '@ohif/core';
import {
  DialogProvider,
  Modal,
  ModalProvider,
  SnackbarProvider,
  UserAuthenticationProvider,
} from '@ohif/ui';
//import createRoutes from './routes';
import appInit from './appInit.js';
import { Home } from './pages';
import configureAppStore from './store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContextProvider from './contexts/AppContextProvider';
import createRoutes from './routes';
import OpenIdConnectRoutes from './utils/OpenIdConnectRoutes';

let commandsManager: CommandsManager,
  servicesManager: ServicesManager,
  extensionManager: ExtensionManager,
  hotkeysManager: HotkeysManager;
  

function App({ config, defaultExtensions, defaultModes }) {
  const [init, setInit] = useState(null);
  useEffect(() => {
    const run = async () => {
      appInit(config, defaultExtensions, defaultModes)
        .then(setInit)
        .catch(console.error);
    };

    run();
  }, []);

  if (!init) {
    return null;
  }

  // Set above for named export
  commandsManager = init.commandsManager;
  servicesManager = init.servicesManager;
  hotkeysManager = init.hotkeysManager;
  extensionManager = init.extensionManager;


  const appConfigState = init.appConfig;
  const {
    routerBasename,
    oidc,
  } = appConfigState;



  // Set appConfig
  const {
    uiDialogService,
    uiModalService,
    uiNotificationService,
    userAuthenticationService,
  } = servicesManager.services;

  const providers = [
    [AppContextProvider],
    [UserAuthenticationProvider, { service: userAuthenticationService }],
    [SnackbarProvider, { service: uiNotificationService }],
    [DialogProvider, { service: uiDialogService }],
    [ModalProvider, { service: uiModalService, modal: Modal }],
  ];
  const CombinedProviders = ({ children }) =>
    Compose({ components: providers, children });


  let authRoutes = null;

  /*
  if (oidc) {
    authRoutes = (
      <OpenIdConnectRoutes
        oidc={oidc}
        routerBasename={routerBasename}
        userAuthenticationService={userAuthenticationService}
      />
    );
  }*/

  return (
    <ReduxProvider store={configureAppStore()}>
      <CombinedProviders>
        <BrowserRouter basename={"/"}>
            <Home / >
        </BrowserRouter>
      </CombinedProviders>
    </ReduxProvider>
  );
}

export default App;

export { commandsManager, servicesManager };
