import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private messageSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor() {}

  getMessage(): Observable<string | null> {
    return this.messageSubject.asObservable();
  }

  setMessage(message: string | null): void {
    this.messageSubject.next(message);
  }
}
