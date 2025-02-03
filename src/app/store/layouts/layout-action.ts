import { createAction, props } from '@ngrx/store';

export const changelayout = createAction('[Layout] Set Layout', props < { layout: string }>());
export const changeMode = createAction('[Layout] Set Mode', props<{ mode: string }>());
export const changeLayoutWidth = createAction('[Layout] Set LayoutWidth', props<{ layoutWidth: string }>());
export const changeLayoutPosition = createAction('[Layout] Set LayoutPosition', props<{ layoutPosition: string }>());
export const changeTopbar = createAction('[Layout] Set TopbarColor', props<{ topbarColor: string }>());
export const changeSidebarSize = createAction('[Layout] Set SidebarSize', props < { sidebarSize: string }>());
export const changeSidebarView = createAction('[Layout] Set SidebarView', props < { sidebarView: string }>());
export const changeSidebarColor = createAction('[Layout] Set SidebarColor', props<{ sidebarColor: string }>());
export const changeSidebarImage = createAction('[Layout] Set SidebarImage', props<{ sidebarImage: string }>());
export const changeSidebarVisibility = createAction('[Layout] Set SidebarVisibility', props<{ sidebarvisibility: string }>());
export const changeDataPreloader = createAction('[Layout] Set Preloader', props<{ Preloader: string }>());

export const resetLayoutState = createAction('[Layout] Reset Layout State');