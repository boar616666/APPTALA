import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/auth";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    //private baseUrl = 'http://localhost:3000/users';
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    registerUser(usuario: User) {
        return this.http.post(`${this.baseUrl}`, usuario);
    }


    getUserByEmail(email:string):Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}?email=${email}`);
    }

    // Método para registrar un nuevo usuario
    register(user: { fullName: string; email: string; password: string }): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/register`, user, { headers });
    }

    // Método para iniciar sesión
    login(credentials: { email: string; password: string }): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/login`, credentials, { headers });
    }
}
