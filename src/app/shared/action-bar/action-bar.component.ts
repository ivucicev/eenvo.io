import { AfterViewInit, Component, ContentChild, input, TemplateRef, viewChild } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SimplebarAngularComponent, SimplebarAngularModule } from 'simplebar-angular';
import { ButtonAction } from '../../core/services/button-action.service';

@Component({
    selector: 'eenvo-action-bar',
    standalone: true,
    imports: [NgClass, SimplebarAngularModule, TranslatePipe, NgTemplateOutlet],
    templateUrl: './action-bar.component.html',
    styleUrl: './action-bar.component.scss'
})
export class ActionBarComponent implements AfterViewInit {

    public actions = input<ButtonAction[] | null>([]);

    @ContentChild(TemplateRef)
    public template: TemplateRef<any> | null = null;

    public simplebar = viewChild<SimplebarAngularComponent>('simplebar');

    private initializeSimpleBar() {
        const simplebar = this.simplebar();
        if (!simplebar) return;

        if (simplebar.SimpleBar !== null) {
            simplebar.SimpleBar.autohide = false;
            const scrollElement = simplebar.SimpleBar.getScrollElement();
            scrollElement.addEventListener('wheel', (event: WheelEvent) => {

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                const horizontalScrollDelta = event.deltaY;
                scrollElement.scrollLeft += horizontalScrollDelta;
            }, { passive: false });
        }
    }

    ngAfterViewInit() {
        this.initializeSimpleBar();
    }
}
