import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Expense {
  _id?: string;
  name: string;
  user: string | null;
  category: string;
  amount: number;
}
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // private apiUrl = 'http://45.55.66.148:3000/expense';
  private apiUrl = 'http://localhost:3000/expense';

  private getHeaders(): HttpHeaders {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Set up headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
  }
  constructor(private http: HttpClient) {}
  isAuthenticated(): boolean {
    // Check if token exists in local storage
    return !!localStorage.getItem('token');
  }
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // addExpense(newExpense: Expense): any {
  addExpense(newExpense: Expense): Observable<Expense> {
    const headers = this.getHeaders();
    console.log(newExpense);
    return this.http.post<Expense>(this.apiUrl, newExpense, {
      headers: headers,
    });
  }

  getExpense(expenseId: string): Observable<Expense> {
    const headers = this.getHeaders();
    return this.http.get<Expense>(`${this.apiUrl}/user/${expenseId}`);
  }

  getUserEmail(): string | null {
    const headers = this.getHeaders();
    return localStorage.getItem('useremail');
  }

  updateExpense(
    expenseId: string,
    updatedExpense: Expense
  ): Observable<Expense> {
    console.log(expenseId, updatedExpense);
    const headers = this.getHeaders();
    return this.http.put<Expense>(
      `${this.apiUrl}/${expenseId}`,
      updatedExpense
    );
  }

  deleteExpense(expenseId: string): Observable<any> {
    const headers = this.getHeaders();
    console.log(expenseId);
    return this.http.delete(`${this.apiUrl}/${expenseId}`, {
      headers: headers,
    });
  }

  getCurrentMonth(): number {
    const currentDate = new Date();
    return currentDate.getMonth() + 1;
  }

  getExpenseData(): Observable<any> {
    const headers = this.getHeaders();
    const user = this.getUserEmail();
    const currentMonth = this.getCurrentMonth();
    return this.http.get(
      `${this.apiUrl}/expenselimit/?user=${user}&currentMonth=${currentMonth}`,
      {
        headers: headers,
      }
    );
  }

  saveExpenseData(expenseData: any): Observable<any> {
    console.log('api call', expenseData);
    return this.http.post(`${this.apiUrl}/expenselimit`, expenseData);
  }
}
