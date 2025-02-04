import { Component } from '@angular/core';
import { HorizontalTopbarComponent } from '../horizontal-topbar/horizontal-topbar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'eenvo-horizontal',
  standalone: true,
  imports: [TopbarComponent, RouterModule, HorizontalTopbarComponent],
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.scss'
})
export class HorizontalComponent {

  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");

    }
  }

}
