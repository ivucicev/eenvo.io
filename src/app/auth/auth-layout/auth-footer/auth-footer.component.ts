import { Component } from '@angular/core';
import * as pkg from '../../../../../package.json'

@Component({
    selector: 'eenvo-auth-footer',
    imports: [],
    templateUrl: './auth-footer.component.html',
    styleUrl: './auth-footer.component.scss'
})
export class AuthFooterComponent {

    // set the currenr year
    version? = pkg.version;

    constructor() {
    }

    year: number = new Date().getFullYear();
}
