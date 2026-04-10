import { Component } from '@angular/core'; // Core decorator added by automation
// Auto: minor tweak for commit automation (no logic change) // updated in PR - v1
import { RouterOutlet } from '@angular/router';
import { changelayout, changeMode } from './store/layouts/layout-action';
import { RootReducerState } from './store';
import { Store } from '@ngrx/store';
import { LAYOUT_TYPES } from './store/layouts/layout';
import { LayoutState } from './store/layouts/layout-reducers';

import { FooterActionBarComponent } from './shared/footer-action-bar/footer-action-bar.component';

import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'eenvo-root',
    imports: [RouterOutlet, FooterActionBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    layOutTypes = LAYOUT_TYPES

    layOutData!: LayoutState;

    constructor(private store: Store<RootReducerState>, private primeng: PrimeNG) {
        const lang = localStorage.getItem('lang') || 'en';
        this.primeng.ripple.set(true)        
        this.store.select('layout').subscribe((data) => {
            this.layOutData = data;
        })

    }

    ngOnInit(): void {
        this.changeMode(this.layOutData.LAYOUT_MODE);
        this.changeLayout(this.layOutData.LAYOUT)
    }


    ngOnDestroy(): void { }

    // Mode Change (auto update)
    changeMode(mode: string) {
        this.store.dispatch(changeMode({ mode }));
    }

    changeLayout(layout: string) {
        this.store.dispatch(changelayout({ layout }));
    }

}
