import { Component, OnInit } from '@angular/core';
import { ModuleServiceService } from './module-service.service';
import { OrganizationList } from './organization';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  organizationList: OrganizationList[] = [];

  constructor(private apiService: ModuleServiceService) {}

  ngOnInit() {
    this.apiService.get().subscribe((response) => {
      this.organizationList=response;
      console.log(response);
      console.log(this.organizationList);
    });
  }

}
