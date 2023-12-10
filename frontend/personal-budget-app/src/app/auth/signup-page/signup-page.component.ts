import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator for password match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  redirectToLoginPage() {
    this.router.navigate([`/login`]); // Replace 'your-route' with the actual route path
  }
  onSubmit() {
    console.log(this.signupForm.value, this.signupForm.valid);
    if (this.signupForm.valid) {
      // Handle form submission logic here
      console.log(this.signupForm.value);
      const signupData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      this.authService.signup(signupData).subscribe(
        () => {
          this.toastr.success('User Created', 'Please Login', {
            timeOut: 5000, // Optional: time in milliseconds before the toast closes automatically
            closeButton: true, // Optional: display a close button
            progressBar: true, // Optional: display a progress bar
            positionClass: 'toast-bottom-right', // Optional: set the position of the toast
          });
          console.log('Signup successful!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup failed:', error);
        }
      );
    } else {
      this.toastr.error('Invalid credentails', 'Sign Failed', {
        timeOut: 5000, // Optional: time in milliseconds before the toast closes automatically
        closeButton: true, // Optional: display a close button
        progressBar: true, // Optional: display a progress bar
        positionClass: 'toast-bottom-right', // Optional: set the position of the toast
      });
    }
  }
}
