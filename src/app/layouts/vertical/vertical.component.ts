import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { RootReducerState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, RouterModule],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent {

  isCondensed = false;

  constructor(private store: Store<RootReducerState>) {}

  ngOnInit(): void {

    window.addEventListener('resize', function () {

      if (document.documentElement.clientWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
        document.querySelector('.hamburger-icon')?.classList.add('open')
      }
      else if (document.documentElement.clientWidth <= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
        document.querySelector('.hamburger-icon')?.classList.add('open')
      }
      else if (document.documentElement.clientWidth >= 1024 && document.documentElement.getAttribute('data-layout-width') == 'fluid') {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
        document.querySelector('.hamburger-icon')?.classList.remove('open')
      }
      else if (document.documentElement.clientWidth >= 1024 && document.documentElement.getAttribute('data-layout-width') == 'boxed') {
        document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        document.querySelector('.hamburger-icon')?.classList.remove('open')
      }
    })

  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    const currentSIdebarSize = document.documentElement.getAttribute("data-sidebar-size");
    if (document.documentElement.clientWidth >= 767) {
      if (currentSIdebarSize == null) {
        (document.documentElement.getAttribute('data-sidebar-size') == null || document.documentElement.getAttribute('data-sidebar-size') == "lg") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg')
      } else if (currentSIdebarSize == "md") {
        (document.documentElement.getAttribute('data-sidebar-size') == "md") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'md')
      } else {
        (document.documentElement.getAttribute('data-sidebar-size') == "sm") ? document.documentElement.setAttribute('data-sidebar-size', 'lg') : document.documentElement.setAttribute('data-sidebar-size', 'sm')
      }
    }

    if (document.documentElement.clientWidth <= 767) {
      document.body.classList.toggle('vertical-sidebar-enable');
    }
    this.isCondensed = !this.isCondensed;
  }

  /**
  * on settings button clicked from topbar
  */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");

    }
  }


}
