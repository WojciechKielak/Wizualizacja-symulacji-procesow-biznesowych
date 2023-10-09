import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProcessList } from 'src/app/models/process';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor(private http: HttpClient) { }
  getProcesses(id: number): Observable<any> {
    console.log(id);
    return this.http.get<ProcessList[]>('http://localhost:8000/processes/')
      .pipe(
        map((processes: ProcessList[]) => processes.filter(process => process.organization === id))
      );
  }
  
}
