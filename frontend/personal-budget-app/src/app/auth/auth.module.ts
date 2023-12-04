import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenWarningComponent } from './token-warning/token-warning.component';
@NgModule({
  declarations: [
    SignupPageComponent,
    LoginPageComponent,
    TokenWarningComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SignupPageComponent, LoginPageComponent, TokenWarningComponent],
})
export class AuthModule {}
