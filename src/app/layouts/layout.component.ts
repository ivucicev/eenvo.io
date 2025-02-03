import { Component } from '@angular/core';
import { VerticalComponent } from './vertical/vertical.component';
import { RootReducerState } from '../store';
import { Store } from '@ngrx/store';
import { changelayout, changeLayoutPosition, changeLayoutWidth, changeMode, changeSidebarColor, changeSidebarSize, changeSidebarView, changeTopbar, resetLayoutState } from '../store/layouts/layout-action';
import { Subject, takeUntil } from 'rxjs';
import { LayoutState } from '../store/layouts/layout-reducers';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { CommonModule } from '@angular/common';
import { LAYOUT_TYPES } from '../store/layouts/layout';
import { ToastsContainer } from '../core/componate/toasts-container.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [VerticalComponent, HorizontalComponent, CommonModule, ToastsContainer],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
    layOutTypes = LAYOUT_TYPES
    layOutData!: LayoutState;

    constructor(private store: Store<RootReducerState>) {
        this.store.select('layout').subscribe((data) => {
            this.layOutData = data;
        });


    }

    ngOnInit(): void {
    }


    ngOnDestroy(): void {
    }

    // Mode Change
    changeMode(mode: string) {
        this.store.dispatch(changeMode({ mode }));
    }

    changeLayout(layout: string) {
        this.store.dispatch(changelayout({ layout }));
    }

    // Position Change
    changePosition(layoutPosition: string) {
        this.store.dispatch(changeLayoutPosition({ layoutPosition }));
    }

    // Width Change
    changeWidth(layoutWidth: string) {
        this.store.dispatch(changeLayoutWidth({ layoutWidth }));
    }

    // Topbar Change
    changeTopColor(topbarColor: string) {
        this.store.dispatch(changeTopbar({ topbarColor }));
    }

    // Sidebar Size Change
    changeSidebarSize(sidebarSize: string) {
        this.store.dispatch(changeSidebarSize({ sidebarSize }));
    }

    // Sidebar Size Change
    changeSidebar(sidebarView: string) {
        this.store.dispatch(changeSidebarView({ sidebarView }));
    }

    // Sidebar Color Change
    changeSidebarColor(sidebarColor: string) {
        this.store.dispatch(changeSidebarColor({ sidebarColor }));
    }

}
