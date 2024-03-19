import { StoreDispatch, StoreGetState } from '../configureStore';
import { currentLayoutChanged, savedLayoutChanged } from './reducer';
import { View, Layout } from '../../constants/views';


// Good resource about what "thunks" are, and why they're used for writing Redux logic: https://redux.js.org/usage/writing-logic-thunks
export const updateCurrentLayout =
    (currentLayout:  Layout ) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            // do some async work (e.g. check if the new webmap id is an valid ArcGIS Online Item)
            // ...
            getState()
            // now everything is ready and we can dispatch the new webmap Id to the reducer to trigger the state change
            dispatch(currentLayoutChanged(currentLayout));
        } catch (err) {
            console.error(err);
        }
    };

export const updateSavedLayouts =
    (newSavedLayout:  View[] ) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            // do some async work (e.g. check if the new webmap id is an valid ArcGIS Online Item)
            // ...
            getState()
            // now everything is ready and we can dispatch the new webmap Id to the reducer to trigger the state change
            dispatch(savedLayoutChanged(newSavedLayout));
        } catch (err) {
            console.error(err);
        }
    };