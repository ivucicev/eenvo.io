import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ButtonAction, ButtonActionService } from '../../core/services/button-action.service';

@Component({
    selector: 'eenvo-footer-action-bar',
    standalone: true,
    imports: [ActionBarComponent],
    templateUrl: './footer-action-bar.component.html',
    styleUrl: './footer-action-bar.component.scss'
})
export class FooterActionBarComponent implements OnDestroy {

    private destroy$ = new Subject<void>();

    public actions: ButtonAction[] = [];

    constructor(
        private buttonActionService: ButtonActionService,
        private router: Router
    ) {
        this.buttonActionService.actions$.pipe(takeUntil(this.destroy$)).subscribe(actions => {
            this.actions = actions ?? [];
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.buttonActionService.clearActions();
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
