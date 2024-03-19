import { PartialRootState } from './configureStore';

import { initialLayoutState, LayoutState } from '../store/Layout/reducer';

const getPreloadedLayoutState = (): LayoutState => {
    return {
        ...initialLayoutState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Layout: getPreloadedLayoutState(),
    };
};

export default getPreloadedState;
