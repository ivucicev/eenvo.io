import { ActionReducerMap } from "@ngrx/store";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";

export interface RootReducerState {
    layout: LayoutState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
}