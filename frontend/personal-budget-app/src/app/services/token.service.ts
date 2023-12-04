import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
    this.checkTokenExpiration();
  }
  private checkTokenExpiration(): void {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const expirationTime: number | null = this.jwtHelper
        .getTokenExpirationDate(token)!
        .getTime();
      const currentTime = new Date().getTime();
      const timeToExpiration = expirationTime - currentTime;

      if (timeToExpiration > 0 && timeToExpiration <= 20000) {
        // Show alert when token is about to expire in 20 seconds
        alert('Warning: Your token will expire in 20 seconds. Refresh it now!');
      }
    }
  }
  refreshToken(): void {
    // Call your token refresh API endpoint here
    // For example:
    // this.authService.refreshToken().subscribe((response) => {
    //   this.setToken(response.token);
    // });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
