import { Component, OnInit } from '@angular/core';
import { ReportService } from './services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataReport, Resource } from './structures/reportList';
import { EventReportList } from './structures/eventReport';
import { ProcessReportList } from './structures/processReport';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{
  displayedColumns: string[] = [ 'name', 'savg', 'max_time', 'median', 'min_time', 'number_of_employee', 'sum',
   'tasks_execute', 'tasks_pending', 'tasks_realized'];
   processColumns: string[] = [ 'name', 'number', 'min_cycle', 'avg_cycle', 'max_cycle',
   'min_work', 'avg_work', 'max_work', 'min_wait', 'avg_wait', 'max_wait'];

  constructor(private reportService: ReportService, private route: ActivatedRoute,
    private router: Router){}
  reportList : DataReport | undefined;
  reportEventList: EventReportList[]=[];
  reportProcessList: ProcessReportList[]=[];

    ngOnInit(): void {
    
    try {
      this.reportService.getRunningSimulation(this.route.snapshot.paramMap.get('raportid')!).subscribe(data => {
        this.reportList = data;
        const keys = Object.keys(this.reportList!.statistics.resources);
      
        keys.forEach(key => {
          const resource = this.reportList!.statistics.resources[key];
      
          if (isResource(resource)) {
            const keys2 = Object.keys(resource);

            keys2.forEach(event => {
              const eventData = resource[event];
              if (typeof eventData !== 'string' && typeof eventData !== 'number') {
                this.reportEventList.push({
                  resource: key,
                  name: event,
                  savg: eventData.avg,
                  max_time: eventData.max_time,
                  median: eventData.median,
                  min_time: eventData.min_time,
                  number_of_employee: eventData.number_of_employee,
                  sum: eventData.sum,
                  tasks_execute: eventData.tasks_execute,
                  tasks_pending: eventData.tasks_pending,
                  tasks_realized: eventData.tasks_realized,
                });
              }
            });

          }
        });
      });
      
      function isResource(value: any): value is Resource {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      }
         
  } catch (error) {
      console.error("Wystąpił błąd podczas pobierania raportu", error);
  }

  this.reportProcessList = this.reportService.getProcesses(this.route.snapshot.paramMap.get('raportid')!);

  }
}
