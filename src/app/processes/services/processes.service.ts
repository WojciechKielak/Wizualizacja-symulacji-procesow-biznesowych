import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProcessList } from 'src/app/models/process';
import { EventList } from '../event';
import { ResourceList } from '../resource';
import { GeneratorList } from '../generator';

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

  getEvents(): Observable<any> {
    return this.http.get<EventList[]>('http://localhost:8000/events/');
  }

  getResources(): Observable<any> {
    return this.http.get<ResourceList[]>('http://localhost:8000/resources/');
  }
  geGenerators(): Observable<any> {
    return this.http.get<GeneratorList[]>('http://localhost:8000/generators/');
  }
}
