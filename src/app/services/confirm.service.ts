import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  url = 'http://localhost:4200/account';

  constructor(private http: HttpClient) { }

  setToken(token) {
    return this.http.put<any>(`${this.url}`, {token});
  }
}