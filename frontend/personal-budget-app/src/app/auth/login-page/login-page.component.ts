import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  alertMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.alertService.getMessage().subscribe((message) => {
      this.alertMessage = message;
      // You can set a timeout to clear the message after a specific duration if needed
    });
  }
  redirectToSignUpPage() {
    this.router.navigate([`/signup`]); // Replace 'your-route' with the actual route path
  }
  onSubmit() {
    console.log(this.loginForm.value);
    const LoginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(LoginData).subscribe(
      () => {
        console.log('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error('Check Email and Password', 'Login Failed', {
          timeOut: 5000, // Optional: time in milliseconds before the toast closes automatically
          closeButton: true, // Optional: display a close button
          progressBar: true, // Optional: display a progress bar
          positionClass: 'toast-bottom-right', // Optional: set the position of the toast
        });
        console.error('Login failed:', error);
      }
    );
  }
}
