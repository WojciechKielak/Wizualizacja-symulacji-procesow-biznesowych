import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationList } from '../structures/organization';
import { ProcessList } from '../structures/process';

@Injectable({
  providedIn: 'root'
})
export class ModuleServiceService {

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<OrganizationList[]>('http://localhost:8000/resources/organizations/');
  }
  getProcesses(): Observable<any> {
    return this.http.get<ProcessList[]>('http://localhost:8000/processes/');
  }

}
