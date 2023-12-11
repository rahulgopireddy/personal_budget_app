import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
// Create a stub/mock for the Router class
class RouterStub {
  navigateByUrl(url: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        AuthService,
        ToastrService,
        { provide: Router, useClass: RouterStub },
      ],
    });

    fixture = TestBed.createComponent(LoginPageComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should navigate to /dashboard after successful login', fakeAsync(() => {
    // Arrange: Set up your test, including spy setup
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    // Act: Trigger the login logic
    component.onSubmit();

    // Assert: Check if navigateByUrl was called
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/dashboard');

    // Ensure that asynchronous operations complete
    tick();
  }));
});
