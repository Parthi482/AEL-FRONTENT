import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  addData(collectionName: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl+collectionName, data, { headers });
  }

  getjosn(jsonName: any) {
    return this.http.get(`assets/json/${jsonName}.json`)
  }
}
