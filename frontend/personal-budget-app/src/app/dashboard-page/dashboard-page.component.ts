import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  // showAlert: boolean = false;
  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    setInterval(() => {
      const expirationTime: any = this.authService.getExpirationTime(); // Implement this method in AuthService
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
    }, 1000);
  }
  ngOnInit(): void {
    const expirationTime: any = this.authService.getExpirationTime(); // Implement this method in AuthService
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    if (timeUntilExpiration < 10000) {
      this.showAlert();
      setTimeout(() => {
        this.hideAlert();
      }, timeUntilExpiration);
    }

    // Implement your GET request logic here
  }
  showAlert() {
    const alertDiv = this.renderer.createElement('div');
    alertDiv.className = 'alert alert-warning alert-dismissible fade show';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      Your session will expire in 10 seconds. Please refresh your session.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    `;

    this.renderer.appendChild(this.el.nativeElement, alertDiv);
  }

  hideAlert() {
    const alert = this.el.nativeElement.querySelector('.alert');
    if (alert) {
      this.renderer.removeChild(this.el.nativeElement, alert);
    }
  }
}
