import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataReport } from '../reportList';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getRunningSimulation(id: string): Observable<any>{
    return this.http.get<DataReport>(`http://localhost:8000/reports/${id}`);
  }
}
