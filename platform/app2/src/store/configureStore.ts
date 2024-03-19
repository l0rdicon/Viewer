import {
    configureStore,
    DeepPartial,
} from '@reduxjs/toolkit';
import { debounce } from "debounce";
import rootReducer from './rootReducer';

//import getPreloadedState from './getPreloadState';

export type RootState = ReturnType<typeof rootReducer>;

export type PartialRootState = DeepPartial<RootState>;

const configureAppStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: loadFromLocalStorage() as any,
    });

    store.subscribe(
        // we use debounce to save the state once each 800ms
        // for better performances in case multiple changes occur in a short time
        debounce(() => {
            saveToLocalStorage(store.getState());
        }, 800)
    );

    return store;
};

export type AppStore = ReturnType<typeof configureAppStore>;

export type StoreDispatch = ReturnType<typeof configureAppStore>['dispatch'];

export type StoreGetState = ReturnType<typeof configureAppStore>['getState'];

//export { getPreloadedState };

function saveToLocalStorage(state: object) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }


//export { getPreloadedState };

export default configureAppStore;