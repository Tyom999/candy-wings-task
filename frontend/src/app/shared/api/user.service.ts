import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {IUsers} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll(page: number, userName= '', limit = 10): Observable<IUsers> {
    return this.http.get<IUsers>('users', {params: {page, limit, userName} });
  }
}
