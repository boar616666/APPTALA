import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api/pagos';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  savePayment(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentData);
  }
}