import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your authentication service
import { AlertService } from './alert-service.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    if (this.authService.isTokenValid()) {
      return true;
    } else {
      // Redirect to the login page if the token is missing, expired, or invalid
      this.toastr.error('Session expired. Please login.', ' ', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      this.alertService.setMessage('Session expired. Please login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
