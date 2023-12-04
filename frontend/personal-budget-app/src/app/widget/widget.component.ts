import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  ɵɵsanitizeUrlOrResourceUrl,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Chart, { ChartData, ChartOptions, elements } from 'chart.js/auto';

interface Expense {
  name: string;
  category: string;
  amount: number;
  date: String;
  user: string;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent {
  loading: boolean = true;
  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('closeModal') _closeModal: ElementRef;
  @ViewChild('categoryBarChart') barchartCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') piechartCanvas: ElementRef<HTMLCanvasElement>;
  user: any = this._ExpenseService.getUserEmail();
  @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;
  private myChart: Chart | undefined;
  ExpenseList: any[] = [];
  isEditedExpense = false;
  totalAmount: number = 0;
  expenseLimit: number = 0;

  private categoryBarChartq: Chart | undefined;
  private categoryPieChartq: Chart | undefined;
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'category', name: 'Category' },
    { prop: 'amount', name: 'Amount' },
    { name: 'Actions', prop: '_id' },
  ];
  expenseForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    amount: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    _id: '',
  });
  categories = [
    'Income',
    'Housing',
    'Transportation',
    'Food',
    'Health',
    'Debt Payments',
    'Savings',
    'Entertainment',
    'Personal Care',
    'Education',
    'Miscellaneous',
    'Insurance',
    'Taxes',
    'Childcare',
    'Investments',
  ];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _ExpenseService: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {
    this.myModal = {} as ElementRef;
    this._closeModal = {} as ElementRef;
    this.barchartCanvas = {} as ElementRef;
    this.myCanvas = {} as ElementRef;
    this.piechartCanvas = {} as ElementRef;
  }

  ngOnInit() {
    const user = this._ExpenseService.getUserEmail();
    this.getExpenseList(user).subscribe(() => {});
    setTimeout(() => {
      this.createChart();

      this.loading = false;
    }, 2000);
  }
  ngAfterViewInit() {
    if (this.myCanvas) {
      this.createChart();
    } else {
      console.error('Canvas element not found.');
    }
  }

  ngAfterViewChecked() {
    // Your code here
    this.cdr.detectChanges();
  }

  createChart() {
    this.createCategoryBarChart();
    this.createCategoryCircularChart();
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      // Access form values
      const expenseName = this.expenseForm.get('name')?.value;
      const expenseAmount = this.expenseForm.get('amount')?.value;
      const expenseCategory = this.expenseForm.get('category')?.value;
      const user = this._ExpenseService.getUserEmail();
      const expenseData = {
        name: expenseName,
        amount: expenseAmount,
        date: new Date(),
        category: expenseCategory,
        user: this._ExpenseService.getUserEmail(),
      };

      if (this.expenseForm.get('_id')?.value) {
        this._ExpenseService
          .updateExpense(this.expenseForm.get('_id')?.value, expenseData)
          .subscribe((res) => {
            if (res) {
              this.toastr.success('Expense Updated !', '', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
              this.getExpenseList(user).subscribe(() => {});
              this.expenseForm.reset();
              this.closeModal();
            } else {
              this.expenseForm.reset();
              this.closeModal();
            }
          });
      } else {
        this._ExpenseService.addExpense(expenseData).subscribe((res) => {
          if (res) {
            if (res) {
              this.getExpenseList(user).subscribe(() => {});
              this.expenseForm.reset();
              this.closeModal();
            }
          }
        });
      }
    } else {
      console.log('else');
    }
  }
  getExpenseList(user: any): Observable<any> {
    this.loadExpenseData().subscribe(() => {});
    return this._ExpenseService.getExpense(user).pipe(
      tap((response: any) => {
        this.ExpenseList = response;
        const values = this.filterExpensesByCurrentMonth();
        this.calculateTotalAmount();
        this.ExpenseList = values;
        // console.log('values', values);
        // console.log('values', response);
      })
    );
  }

  editExpense(expense: any) {
    this.isEditedExpense = true;
    const foundObject = this.ExpenseList.find((obj) => obj._id === expense);
    if (foundObject) {
      this.expenseForm.setValue({
        amount: foundObject.amount,
        category: foundObject.category,
        name: foundObject.name,
        _id: foundObject._id,
      });
    }
  }

  deleteExpense(expenseId: any) {
    // Implement delete logic
    this._ExpenseService.deleteExpense(expenseId).subscribe((response) => {
      this.ExpenseList = [];
      this.getExpenseList(this.user).subscribe(() => {});
      this.toastr.warning('Expense deleted', '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    });
  }
  closeModal() {
    this._closeModal.nativeElement.click();
  }
  filterExpensesByCurrentMonth(): any[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

    return this.ExpenseList.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1;
      // console.log(expenseMonth, currentMonth);
      return expenseMonth === currentMonth;
    });
  }
  calculateTotalAmount() {
    this.totalAmount = this.ExpenseList.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }

  loadExpenseData() {
    return this._ExpenseService.getExpenseData().pipe(
      tap(
        (data: any) => {
          this.expenseLimit = data.monthlybudget;
          // console.log(data, 'test');
          if (data) {
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
      )
    );
  }

  createCategoryBarChart() {
    this.loading = false;
    const totalexpenditureCategory = this.calculateTotalExpenditure(
      this.ExpenseList
    );
    const ctx: any = this.myCanvas.nativeElement.getContext('2d');
    if (this.categoryBarChartq) {
      this.categoryBarChartq.destroy();
    }

    this.categoryBarChartq = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Income',
          'Housing',
          'Transportation',
          'Food',
          'Health',
          'Debt Payments',
          'Savings',
          'Entertainment',
          'Personal Care',
          'Education',
          'Miscellaneous',
          'Insurance',
          'Taxes',
          'Childcare',
          'Investments',
        ],
        datasets: [
          {
            label: 'Spending',
            data: [
              totalexpenditureCategory['income'],
              totalexpenditureCategory['housing'],
              totalexpenditureCategory['transportation'],
              totalexpenditureCategory['food'],
              totalexpenditureCategory['health'],
              totalexpenditureCategory['savings'],
              totalexpenditureCategory['education'],
              totalexpenditureCategory['miscellaneous'],
              totalexpenditureCategory['insurance'],
              totalexpenditureCategory['taxes'],
              totalexpenditureCategory['childcare'],
              totalexpenditureCategory['investments'],
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  createCategoryCircularChart() {
    this.loading = false;
    const totalexpenditureCategory = this.calculateTotalExpenditure(
      this.ExpenseList
    );
    const ctx: any = this.piechartCanvas.nativeElement.getContext('2d');
    console.log(totalexpenditureCategory, 'test');
    if (this.categoryPieChartq) {
      this.categoryPieChartq.destroy();
    }

    const categoryColors: string[] = [
      '#FF5733', // Income
      '#FFC300', // Housing
      '#3498DB', // Transportation
      '#2ECC71', // Food
      '#E74C3C', // Health
      '#9B59B6', // Debt Payments
      '#F39C12', // Savings
      '#E67E22', // Entertainment
      '#16A085', // Personal Care
      '#2980B9', // Education
      '#95A5A6', // Miscellaneous
      '#34495E', // Insurance
      '#D35400', // Taxes
      '#8E44AD', // Childcare
      '#27AE60', // Investments
    ];
    const data: ChartData = {
      labels: [
        'Income',
        'Housing',
        'Transportation',
        'Food',
        'Health',
        'Debt Payments',
        'Savings',
        'Entertainment',
        'Personal Care',
        'Education',
        'Miscellaneous',
        'Insurance',
        'Taxes',
        'Childcare',
        'Investments',
      ],
      datasets: [
        {
          data: [
            totalexpenditureCategory['income'],
            totalexpenditureCategory['housing'],
            totalexpenditureCategory['transportation'],
            totalexpenditureCategory['food'],
            totalexpenditureCategory['health'],
            totalexpenditureCategory['savings'],
            totalexpenditureCategory['education'],
            totalexpenditureCategory['miscellaneous'],
            totalexpenditureCategory['insurance'],
            totalexpenditureCategory['taxes'],
            totalexpenditureCategory['childcare'],
            totalexpenditureCategory['investments'],
          ], // Add your data values here
          backgroundColor: categoryColors,
        },
      ],
    };

    const options: ChartOptions = {
      animation: {},
    };
    console.log(ctx);
    this.categoryPieChartq = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
  calculateTotalExpenditure(expenses: any) {
    const totalExpenditure: Record<string, number> = {};

    expenses.forEach((expense: any) => {
      const { category, amount } = expense;

      // Convert category to lowercase and remove spaces
      const formattedCategory = category.toLowerCase().replace(/\s/g, '');

      if (totalExpenditure[formattedCategory]) {
        totalExpenditure[formattedCategory] += amount;
      } else {
        totalExpenditure[formattedCategory] = amount;
      }
    });
    console.log(totalExpenditure);
    return totalExpenditure;
  }
}
