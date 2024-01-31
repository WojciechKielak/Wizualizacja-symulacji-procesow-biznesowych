import { Component, OnInit } from '@angular/core';
import { ModuleServiceService } from './services/module-service.service';
import { OrganizationList } from './structures/organization';
import { ProcessList } from './structures/process';

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
