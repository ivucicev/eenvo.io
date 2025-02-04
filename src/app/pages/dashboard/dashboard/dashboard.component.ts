import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';


@Component({
  selector: 'eenvo-dashboard',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    /**
       * BreadCrumb
       */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];
  }
}