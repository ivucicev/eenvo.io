import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-footer',
  standalone: true,
  imports: [],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.scss'
})
export class AuthFooterComponent {

  // set the currenr year
  year: number = new Date().getFullYear();
}
