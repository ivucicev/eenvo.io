import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { changelayout, changeMode } from './store/layouts/layout-action';
import { RootReducerState } from './store';
import { Store } from '@ngrx/store';
import { LAYOUT_TYPES } from './store/layouts/layout';
import { LayoutState } from './store/layouts/layout-reducers';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	layOutTypes = LAYOUT_TYPES

	layOutData!: LayoutState;

	constructor(private store: Store<RootReducerState>) {
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

