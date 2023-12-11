import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://45.55.66.148:3000/auth'; // Replace this with your API endpoint
  // private apiUrl = 'http://localhost:3000/auth'; // Replace this with your API endpoint
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    const signupUrl = `${this.apiUrl}/signup`;
    return this.http.post(signupUrl, userData);
  }

  login(loginData: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, loginData).pipe(
      tap((response: any) => {
        // Assuming the API response contains a token
        if (response && response.token) {
          // Save token to local storage
          localStorage.setItem('useremail', loginData.email);
          localStorage.setItem('token', response.token);
          console.log('token set');
        }
      })
    );
  }
  logout(): void {
    console.log('test');
    // Remove token from local storage on logout
    localStorage.removeItem('useremail');
    localStorage.removeItem('token');
  }
  isTokenValid(): boolean {
    const token = localStorage.getItem('token');

    // Check if the token is present and not expired
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
  // Example function to check if the user is authenticated
  isAuthenticated(): boolean {
    // Check if token exists in local storage
    return !!localStorage.getItem('token');
  }
  getExpirationTime(): Date | null {
    const token = localStorage.getItem('token');

    if (token) {
      const expirationTime = this.jwtHelper.getTokenExpirationDate(token);
      // console.log(expirationTime);
      return expirationTime;
    }
    return null;
  }
}
