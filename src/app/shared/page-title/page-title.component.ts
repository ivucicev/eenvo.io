import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'eenvo-page-title',
    imports: [CommonModule],
    templateUrl: './page-title.component.html',
    styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() title: string | undefined;
  @Input()
  breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
  }>;

  Item!: Array<{
    label?: string;
  }>;

  constructor() { }

  ngOnInit(): void {
  }

}
