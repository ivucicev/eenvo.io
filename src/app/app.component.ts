import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { changelayout, changeMode } from './store/layouts/layout-action';
import { RootReducerState } from './store';
import { Store } from '@ngrx/store';
import { LAYOUT_TYPES } from './store/layouts/layout';
import { LayoutState } from './store/layouts/layout-reducers';


import hrMessages from "../assets/i18n/messages/hr.json";
import deMessages from "devextreme/localization/messages/de.json";
import enMessages from "devextreme/localization/messages/en.json";
import esMessages from "devextreme/localization/messages/es.json";
import itMessages from "devextreme/localization/messages/it.json";
import frMessages from "devextreme/localization/messages/fr.json";
import plMessages from "devextreme/localization/messages/pl.json";

import { loadMessages } from "devextreme/localization";

@Component({
	selector: 'eenvo-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	layOutTypes = LAYOUT_TYPES

	layOutData!: LayoutState;

	constructor(private store: Store<RootReducerState>) {

        loadMessages(hrMessages)
        loadMessages(deMessages)
        loadMessages(enMessages)
        loadMessages(esMessages)
        loadMessages(itMessages)
        loadMessages(frMessages)
        loadMessages(plMessages)

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

