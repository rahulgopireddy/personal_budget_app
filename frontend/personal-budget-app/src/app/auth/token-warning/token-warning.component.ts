import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-token-warning',
  templateUrl: './token-warning.component.html',
  styleUrls: ['./token-warning.component.css'],
})
export class TokenWarningComponent {
  showWarning: boolean = false;
  countdownTime: number = 20;
  constructor(
    private toastr: ToastrService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    setInterval(() => {
      this.checkTokenExpiration();
    }, 1000);
  }

  ngOnInit(): void {
    this.tokenService.token$.subscribe((token) => {
      if (token) {
        this.checkTokenExpiration();
      }
    });
  }

  private checkTokenExpiration(): void {
    const token = this.tokenService.getToken();
    if (token) {
      const expirationTime = this.tokenService.jwtHelper
        .getTokenExpirationDate(token)!
        .getTime();
      const currentTime = new Date().getTime();
      const timeToExpiration = expirationTime - currentTime;
      if (timeToExpiration > 0 && timeToExpiration <= 20000) {
        this.showWarning = true;
        this.startCountdown(timeToExpiration / 1000);
      } else {
        this.showWarning = false;
      }
    }
  }

  private startCountdown(seconds: number): void {
    const interval = setInterval(() => {
      this.countdownTime = Math.round(seconds);
      seconds--;
      if (seconds < 0) {
        this.toastr.error('Session expired. Please login.', ' ', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate(['/login']);
        clearInterval(interval);
        this.hideAlert();
      }
    }, 1000);
  }

  hideAlert(): void {
    this.showWarning = false;
  }

  refreshToken(): void {
    this.tokenService.refreshToken();
    this.hideAlert();
  }
}
