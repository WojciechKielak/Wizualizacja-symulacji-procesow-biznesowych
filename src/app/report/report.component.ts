import { Component, OnInit } from '@angular/core';
import { ReportService } from './services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataReport, Resource } from './reportList';
import { EventReportList } from './eventReport';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{
  displayedColumns: string[] = [ 'name', 'savg', 'max_time', 'median', 'min_time', 'number_of_employee', 'sum',
   'tasks_execute', 'tasks_pending', 'tasks_realized'];

 // dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private reportService: ReportService, private route: ActivatedRoute,
    private router: Router){}
  reportList : DataReport | undefined;
  reportEventList: EventReportList[]=[];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    ngOnInit(): void {
    
    try {
      console.log("Przed pobraniem raportu " + this.route.snapshot.paramMap.get('raportid') );
      this.reportService.getRunningSimulation(this.route.snapshot.paramMap.get('raportid')!).subscribe(data => {
        console.log(data);
        this.reportList = data;
        const keys = Object.keys(this.reportList!.statistics.resources);
      
        keys.forEach(key => {
          const resource = this.reportList!.statistics.resources[key];
      
          // Sprawdź, czy aktualny klucz dotyczy rzeczywistych zasobów (a nie metadanych)
          if (isResource(resource)) {
            const keys2 = Object.keys(resource);
            console.log("K ");
            console.log(keys2);
      
            keys2.forEach(event => {
              const eventData = resource[event];
              if (typeof eventData !== 'string' && typeof eventData !== 'number') {
                console.log(event);
                console.log(eventData.avg); // Dostęp do właściwości avg
                console.log(eventData.max_time); // Dostęp do innych właściwości ResourceData
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
        console.log(this.reportEventList);
      });
      
      // Sprawdź, czy wartość jest rzeczywistym zasobem
      function isResource(value: any): value is Resource {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      }
      
      // Sprawdź, czy klucz jest kluczem metadanych, których nie chcesz wyświetlać
      function isMetadataKey(key: string): boolean {
        return ['type', 'quantity', 'cost_of_use', 'hourly_salary'].includes(key);
      }
      
      console.log("Po pobraniu raportu");
      console.log(this.reportList);

      
      
  } catch (error) {
      console.error("Wystąpił błąd podczas pobierania raportu", error);
      // Dodaj odpowiednią obsługę błędu tutaj
  }
  }
}
