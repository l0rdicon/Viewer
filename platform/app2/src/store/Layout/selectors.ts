import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectCurrentLayout = createSelector(
    (state: RootState) => state.Layout.currentLayout,
    (currentLayout) => currentLayout,
);

export const selectSavedLayouts = createSelector(
    (state: RootState) => state.Layout.savedLayouts,
    (savedLayouts) => savedLayouts,
);