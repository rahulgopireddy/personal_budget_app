import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private router: Router) {}
  redirectToLoginPage() {
    this.router.navigate([`/login`]); // Replace 'your-route' with the actual route path
  }
  redirectToSignUpPage() {
    this.router.navigate([`/signup`]); // Replace 'your-route' with the actual route path
  }
}
