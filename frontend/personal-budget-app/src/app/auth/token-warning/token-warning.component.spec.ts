import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenWarningComponent } from './token-warning.component';

describe('TokenWarningComponent', () => {
  let component: TokenWarningComponent;
  let fixture: ComponentFixture<TokenWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenWarningComponent],
    });
    fixture = TestBed.createComponent(TokenWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
