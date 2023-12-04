import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(
    private router: Router,
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string) {
    this.router.navigate(['/dashboard', { outlets: { content: [route] } }]);
  }

  logout() {
    this._AuthService.logout();
    this.router.navigate(['/login']).then(() => {
      this.toastr.error('everything is broken', 'Major Error', {
        timeOut: 3000,
      });
    });
  }
}
