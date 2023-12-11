import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { AppModule } from '../app.module';
import { LoginPageComponent } from '../auth/login-page/login-page.component';

// Mock class for the Router
class RouterStub {
  navigateByUrl(url: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, , LoginPageComponent],
      providers: [{ provide: Router, useClass: RouterStub }],
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  xit('should navigate to /login when redirectToLoginPage is called', () => {
    // Arrange: Set up your test, including spy setup
    const navigateSpy = spyOn(router, 'navigateByUrl');

    // Act: Trigger the redirectToLoginPage method
    component.redirectToLoginPage();

    // Assert: Check if navigateByUrl was called with the expected URL
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
