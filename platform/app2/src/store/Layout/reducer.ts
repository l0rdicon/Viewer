import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { defaultViews, View } from '../../constants/views';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type LayoutState = {
    // ArcGIS Online Webmap Item Id
    currentLayout: View;
    savedLayouts: View[];
};

export const initialLayoutState: LayoutState = {
    currentLayout: defaultViews[0], // Topographic
    savedLayouts: [],
};

const slice = createSlice({
    name: 'Layout',
    initialState: initialLayoutState,
    reducers: {
        currentLayoutChanged: (state, action: PayloadAction<object>) => {
            state.currentLayout = action.payload as View;
        },
        savedLayoutChanged: (state, action: PayloadAction<object>) => {
            state.savedLayouts = action.payload as View[];
        },
    },
});

const { reducer } = slice;

export const { currentLayoutChanged, savedLayoutChanged } = slice.actions;

export default reducer;