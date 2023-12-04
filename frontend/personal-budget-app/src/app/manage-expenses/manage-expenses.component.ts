import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-manage-expenses',
  templateUrl: './manage-expenses.component.html',
  styleUrls: ['./manage-expenses.component.css'],
})
export class ManageExpensesComponent {
  expenseForm: any;
  expenseCategories: string[] = [
    'Groceries',
    'Utilities',
    'Rent',
    'Transportation',
    'Entertainment',
    'Insurance',
    'Debt Payments',
    'Education',
    'Savings',
    'Miscellaneous',
    'MonthlyBudget',
  ];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _ExpenseService: ExpenseService
  ) {
    this.createExpenseForm();
  }

  ngOnInit(): void {
    this.createExpenseForm();
    this.loadExpenseData();
  }
  user: any = this._ExpenseService.getUserEmail();
  currentDate = new Date();

  // Get the month (zero-based)
  currentMonthZeroBased = this.currentDate.getMonth();

  // Add 1 to get the current month as a 1-based value
  currentMonthOneBased = this.currentMonthZeroBased + 1;
  createExpenseForm() {
    const formGroupConfig: { [key: string]: any } = {};

    this.expenseCategories.forEach((category) => {
      formGroupConfig[category.toLowerCase().replace(/\s/g, '')] = [
        50,
        Validators.required,
      ];
    });

    this.expenseForm = this.fb.group(formGroupConfig);
  }
  onSubmit() {
    if (this.expenseForm.valid) {
      const formValues = this.expenseForm.value;
      const userdetails = {
        user: this.user,
        currentMonth: this.currentMonthOneBased,
      };
      const apiData = { ...this.expenseForm.value, ...userdetails };
      // console.log(apiData, 'data');
      // Perform API call or any other action
      this._ExpenseService.saveExpenseData(apiData).subscribe(
        () => {
          this.toastr.success('Expense form submitted successfully!');
          this.loadExpenseData(); // Refresh data after saving
        },
        (error) => {
          console.error('Error:', error);
          this.toastr.error('Failed to save expense data.');
        }
      );
      this.toastr.success('Expense form submitted successfully!');
    } else {
      this.toastr.error('Please fill out the field with a valid number.');
      this.validateAllFormFields(this.expenseForm);
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }
  loadExpenseData(): void {
    this._ExpenseService.getExpenseData().subscribe(
      (data) => {
        console.log(data, 'test');
        if (data) {
          console.log(data);
          this.expenseForm.patchValue(data);
        } else {
        }
      },
      (error) => {
        console.error('Error:', error);
        this.toastr.warning(
          'Please set Expense Limit for this month',
          'No Expense Limit Set ',
          {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          }
        );
        this.toastr.error('Failed to load expense data.');
      }
    );
  }
}
