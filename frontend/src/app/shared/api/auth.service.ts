import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuth, ILogin, IUser} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: IUser = { id: '', email: '', name: '' };

  constructor(private http: HttpClient) { }

  login(data: ILogin): Observable<IAuth> {
    return this.http.post<IAuth>('users/login', data)
      .pipe(
        tap(({token, user}) => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
        })
      );
  }

  register(data: IUser): Observable<IUser> {
    return this.http.post<IUser>('users', data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): IUser {
    // return this.user;
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }
}
