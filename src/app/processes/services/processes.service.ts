import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProcessList } from 'src/app/models/process';
import { EventList } from '../event';
import { ResourceList } from '../resource';
import { GeneratorList } from '../generator';
import { GateList } from '../gate';
import { GateAndList } from '../gateAnd';

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
  getGenerators(): Observable<any> {
    return this.http.get<GeneratorList[]>('http://localhost:8000/generators/');
  }
  getGatewaysXor(): Observable<any> {
    return this.http.get<GateList[]>('http://localhost:8000/gateways/xor/');
  }
  getGatewaysOr(): Observable<any> {
    return this.http.get<GateList[]>('http://localhost:8000/gateways/or/');
  }
  getGatewaysAnd(): Observable<any> {
    return this.http.get<GateAndList[]>('http://localhost:8000/gateways/parallels/');
  }
  getRun(id: number): Observable<any> {
    return this.http.get<string>(`http://localhost:8000/processes/simulations/run/${id}`);
  }
  getRunningSimulation(id: string): Observable<any> {
    return this.http.get<string>(`http://localhost:8000/processes/simulations/status/${id}`);
  }

  getEnd(id: number): Observable<any> {
    return this.http.get<string>(`http://localhost:8000/processes/simulations/end/${id}`);
  }

  getStop(id: number): Observable<any> {
    return this.http.get<string>(`http://localhost:8000/processes/simulations/end/${id}`);
  }


}
