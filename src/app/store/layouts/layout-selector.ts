import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout-reducers';

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getLayoutTheme = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT
);

export const getLayoutMode = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_MODE
);

export const getLayoutWith = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_WIDTH
);

export const getLayoutPosition = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_POSITION
);

export const getTopbarColor = createSelector(
    getLayoutState,
    (state: LayoutState) => state.TOPBAR
);

export const getSidebarSize = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_SIZE
);

export const getSidebarColor = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_COLOR
);

export const getSidebarView = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_VIEW
);

export const getSidebarVisibility = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_VISIBILITY
);
