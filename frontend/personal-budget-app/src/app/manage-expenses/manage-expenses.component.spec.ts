import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpensesComponent } from './manage-expenses.component';

describe('ManageExpensesComponent', () => {
  let component: ManageExpensesComponent;
  let fixture: ComponentFixture<ManageExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageExpensesComponent]
    });
    fixture = TestBed.createComponent(ManageExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
