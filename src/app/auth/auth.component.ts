import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from './auth-layout/auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-layout/auth-footer/auth-footer.component';
import { ToastsContainer } from '../core/componate/toasts-container.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'eenvo-auth',
    imports: [AuthHeaderComponent, RouterModule, AuthFooterComponent, ToastsContainer],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

}