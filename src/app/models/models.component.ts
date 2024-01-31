import { Component, OnInit } from '@angular/core';
import { ModuleServiceService } from './module-service.service';
import { OrganizationList } from './organization';
import { ProcessList } from './process';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  organizationList: OrganizationList[] = [];
  processesList: ProcessList[] = [];

  constructor(private apiService: ModuleServiceService) {}

  ngOnInit() {
    this.apiService.get().subscribe((response) => {
      this.organizationList=response;
    });

    this.apiService.getProcesses().subscribe((response) => {
      this.processesList=response;
    });

  }

}
