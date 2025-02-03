import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, filter, tap, catchError } from 'rxjs/operators';
import { changeTopbar, changelayout, changeMode, changeSidebarColor } from './layout-action';
import { LAYOUT_TYPES, LAYOUT_MODE, LAYOUT_TOPBAR_COLOR_TYPES, SIDEBAR_COLOR } from './layout';
import { getLayoutState } from './layout-selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class LayoutEffects {
  constructor() {}
  actions$ = inject(Actions);
  store = inject(Store);

  autoChangeTopbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changelayout, changeMode),
      withLatestFrom(this.store.select(getLayoutState)),
      map(([_, state]) =>
        state.LAYOUT_MODE === LAYOUT_MODE.DARKMODE && state.LAYOUT === LAYOUT_TYPES.HORIZONTAL
          ? changeTopbar({ topbarColor: LAYOUT_TOPBAR_COLOR_TYPES.DARK })
          : changeTopbar({ topbarColor: LAYOUT_TOPBAR_COLOR_TYPES.LIGHT })
      )
    )
  );

  autoSideBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeMode),
      withLatestFrom(this.store.select(getLayoutState)),
      map(([_, state]) =>
        state.LAYOUT_MODE === LAYOUT_MODE.DARKMODE && state.LAYOUT === LAYOUT_TYPES.VERTICAL
          ? changeSidebarColor({ sidebarColor: SIDEBAR_COLOR.DARK })
          : changeSidebarColor({ sidebarColor: SIDEBAR_COLOR.LIGHT })
      )
    )
  );    
}
