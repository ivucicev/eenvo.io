import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ButtonAction, ButtonActionService } from '../../core/services/button-action.service';

@Component({
    selector: 'eenvo-footer-action-bar',
    imports: [ActionBarComponent],
    templateUrl: './footer-action-bar.component.html',
    styleUrl: './footer-action-bar.component.scss'
})
export class FooterActionBarComponent implements OnDestroy {

    private destroy$ = new Subject<void>();

    public actions: ButtonAction[] = [];

    constructor(
        private buttonActionService: ButtonActionService
    ) {
        this.buttonActionService.actions$.pipe(takeUntil(this.destroy$)).subscribe(actions => {
            this.actions = actions ?? [];
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
