import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const loggedIn = localStorage.getItem('loggedIn');
    this.loggedIn.next(loggedIn === 'true');
  }

  register(user: { fullName: string; email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/register`, user, { headers });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/login`, credentials, { headers })
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
          this.setUserId(response.userId);
          console.log("User ID guardado en el servicio: ", response.userId);
          this.loggedIn.next(true);
          localStorage.setItem('loggedIn', 'true');
        })
      );
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('loggedIn');
    this.removeToken();
    this.removeUserId();
  }

  getIsLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  removeUserId(): void {
    localStorage.removeItem('userId');
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }
}
