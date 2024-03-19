import {
  CommandsManager,
  ExtensionManager,
  ServicesManager,
  HotkeysManager,
  UINotificationService,
  UIModalService,
  UIDialogService,
  CustomizationService,
  UserAuthenticationService,
  // utils,
} from '@ohif/core';

/**
 * @param {object|func} appConfigOrFunc - application configuration, or a function that returns application configuration
 * @param {object[]} defaultExtensions - array of extension objects
 */
async function appInit(appConfigOrFunc, defaultExtensions, defaultModes) {
  const commandsManagerConfig = {
    getAppState: () => {},
  };

  const commandsManager = new CommandsManager(commandsManagerConfig);
  const servicesManager = new ServicesManager(commandsManager);
  const hotkeysManager = new HotkeysManager(commandsManager, servicesManager);

  const appConfig = {
    ...(typeof appConfigOrFunc === 'function'
      ? await appConfigOrFunc({ servicesManager })
      : appConfigOrFunc),
  };

  const extensionManager = new ExtensionManager({
    commandsManager,
    servicesManager,
    hotkeysManager,
    appConfig,
  });

  servicesManager.registerServices([
    UINotificationService.REGISTRATION,
    UIModalService.REGISTRATION,
    UIDialogService.REGISTRATION,
    UserAuthenticationService.REGISTRATION,
  ]);


  return {
    appConfig,
    commandsManager,
    servicesManager,
    hotkeysManager,
  };
}

export default appInit;
