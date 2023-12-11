import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ManageExpensesComponent } from './manage-expenses.component';

describe('ManageExpensesComponent', () => {
  let component: ManageExpensesComponent;
  let fixture: ComponentFixture<ManageExpensesComponent>;
  class MockToastrService {
    success() {}
    error() {}
    // Add other methods if used
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageExpensesComponent],
      providers: [{ provide: ToastrService, useClass: MockToastrService }],
    });
    fixture = TestBed.createComponent(ManageExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
