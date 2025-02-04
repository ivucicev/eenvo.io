import { Action, createReducer, on } from '@ngrx/store';
import { changeMode, changeLayoutWidth, changeLayoutPosition, changeTopbar, changeDataPreloader, changeSidebarColor, changeSidebarSize, changelayout, changeSidebarImage, changeSidebarView, changeSidebarVisibility, resetLayoutState } from "./layout-action";
import { LAYOUT_WIDTH_TYPES, LAYOUT_POSITION_TYPES, LAYOUT_TOPBAR_COLOR_TYPES, PERLOADER_TYPES, LAYOUT_TYPES, LAYOUT_MODE, SIDEBAR_COLOR, SIDEBAR_IMAGE, SIDEBAR_VIEW, SIDEBAR_SIZE, SIDEBAR_VISIBILITY } from './layout';

export interface LayoutState {
    LAYOUT: string;
    LAYOUT_MODE: string;
    LAYOUT_WIDTH: string;
    LAYOUT_POSITION: string;
    TOPBAR: string;
    SIDEBAR_SIZE: string;
    SIDEBAR_VIEW: string;
    SIDEBAR_COLOR: string;
    SIDEBAR_VISIBILITY: string;
}

// IntialState
export const initialState: LayoutState = {
    LAYOUT: LAYOUT_TYPES.VERTICAL,
    LAYOUT_MODE: LAYOUT_MODE.LIGHTMODE,
    LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
    LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
    TOPBAR: LAYOUT_TOPBAR_COLOR_TYPES.LIGHT,
    SIDEBAR_COLOR: SIDEBAR_COLOR.LIGHT,
    SIDEBAR_SIZE: SIDEBAR_SIZE.LARGE,
    SIDEBAR_VIEW: SIDEBAR_VIEW.DEFAULT,
    SIDEBAR_VISIBILITY: SIDEBAR_VISIBILITY.SHOW,
}

// Reducer
export const layoutReducer = createReducer(
    initialState,
    on(changelayout, (state, action) => {
        document.documentElement.setAttribute('data-layout', action.layout)
        return { ...state, LAYOUT: action.layout };
    }),
    on(changeMode, (state, action) => {
        document.documentElement.setAttribute('data-bs-theme', action.mode);
        return { ...state, LAYOUT_MODE: action.mode };
    }),
    on(changeSidebarVisibility, (state, action) => {
        document.documentElement.setAttribute('data-sidebar-visibility', action.sidebarvisibility)
        return { ...state, SIDEBAR_VISIBILITY: action.sidebarvisibility };
    }),
    on(changeLayoutWidth, (state, action) => {

        const size = action.layoutWidth === LAYOUT_WIDTH_TYPES.FLUID ? 'lg' : 'sm-hover';

        document.documentElement.setAttribute('data-layout-width', action.layoutWidth);
        document.documentElement.setAttribute('data-sidebar-size', size)

        return { ...state, LAYOUT_WIDTH: action.layoutWidth };
    }),
    on(changeLayoutPosition, (state, action) => {
        document.documentElement.setAttribute('data-layout-position', action.layoutPosition);
        return { ...state, LAYOUT_POSITION: action.layoutPosition };
    }),
    on(changeTopbar, (state, action) => {
        document.documentElement.setAttribute('data-topbar', action.topbarColor)
        return { ...state, TOPBAR: action.topbarColor };
    }),
    on(changeSidebarSize, (state, action) => {
        document.documentElement.setAttribute('data-sidebar-size', action.sidebarSize)
        return { ...state, SIDEBAR_SIZE: action.sidebarSize };
    }),
    on(changeSidebarView, (state, action) => {
        document.documentElement.setAttribute('data-layout-style', action.sidebarView);
        return { ...state, SIDEBAR_VIEW: action.sidebarView };
    }),
    on(changeSidebarColor, (state, action) => {
        document.documentElement.setAttribute('data-sidebar', action.sidebarColor)
        return { ...state, SIDEBAR_COLOR: action.sidebarColor };
    }),
    on(changeSidebarImage, (state, action) => ({ ...state, SIDEBAR_IMAGE: action.sidebarImage })),
    on(changeDataPreloader, (state, action) => ({ ...state, DATA_PRELOADER: action.Preloader })),

    on(resetLayoutState, () => {
        document.documentElement.setAttribute('data-layout', 'vertical');
        document.documentElement.setAttribute('data-topbar', 'light');
        document.documentElement.setAttribute('data-sidebar', 'light');
        document.documentElement.setAttribute('data-layout-style', 'default');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.documentElement.setAttribute('data-layout-width', 'fluid');
        document.documentElement.setAttribute('data-layout-position', 'fixed');
        document.documentElement.setAttribute('data-sidebar-image', 'none');
        document.documentElement.setAttribute('data-preloader', 'disable');
        document.documentElement.setAttribute('data-sidebar-size', 'lg');

        return initialState;
    }),
);

// Selector
export function reducer(state: LayoutState | undefined, action: Action) {
    return layoutReducer(state, action);
}