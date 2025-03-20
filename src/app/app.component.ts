import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { changelayout, changeMode } from './store/layouts/layout-action';
import { RootReducerState } from './store';
import { Store } from '@ngrx/store';
import { LAYOUT_TYPES } from './store/layouts/layout';
import { LayoutState } from './store/layouts/layout-reducers';

import { loadMessages } from "devextreme/localization";
import { FooterActionBarComponent } from './shared/footer-action-bar/footer-action-bar.component';

@Component({
    selector: 'eenvo-root',
    standalone: true,
    imports: [RouterOutlet, FooterActionBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    layOutTypes = LAYOUT_TYPES

    layOutData!: LayoutState;

    constructor(private store: Store<RootReducerState>) {
        const lang = localStorage.getItem('lang') || 'en';
        if (lang == 'hr') {
            import("../assets/i18n/messages/hr.json").then(res => {
                loadMessages(res)
            });
        } else {
            import(`../../node_modules/devextreme/localization/messages/${lang}.json`).then(res => {
                loadMessages(res)
            });
        }

        this.store.select('layout').subscribe((data) => {
            this.layOutData = data;
        })

    }

    ngOnInit(): void {
        this.changeMode(this.layOutData.LAYOUT_MODE);
        this.changeLayout(this.layOutData.LAYOUT)
    }


    ngOnDestroy(): void { }

    // Mode Change
    changeMode(mode: string) {
        this.store.dispatch(changeMode({ mode }));
    }

    changeLayout(layout: string) {
        this.store.dispatch(changelayout({ layout }));
    }

}

