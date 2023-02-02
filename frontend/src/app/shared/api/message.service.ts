import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IMessages} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  getAll(page: number, user2Id = ''): Observable<IMessages> {
    return this.http.get<IMessages>('messages', {params: {page, user2Id} });
  }
}
