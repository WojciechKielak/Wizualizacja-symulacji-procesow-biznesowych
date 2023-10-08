import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationList } from './organization';
import { ProcessList } from './process';

@Injectable({
  providedIn: 'root'
})
export class ModuleServiceService {

  private apiUrl = 'http://localhost:8000/resources/organization/';
  
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    // return this.http.get('/api/resources/organization/');
    return this.http.get<OrganizationList[]>('http://localhost:8000/resources/organization/');
  }
  getProcesses(): Observable<any> {
    return this.http.get<ProcessList[]>('http://localhost:8000/processes/');
  }

  // get(endpoint: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${endpoint}`);
  // }

  post(): Observable<any> {
    return this.http.get('/api/resources/organization/');

  }
}
