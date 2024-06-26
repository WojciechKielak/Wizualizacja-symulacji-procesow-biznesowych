import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelsComponent } from './models/models.component';
import { ProcessesComponent } from './processes/processes.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path:'models', component: ModelsComponent},
  { path:'report/:raportid', component: ReportComponent},
  { path:'processes/:processesid', component: ProcessesComponent},
{ path:'models', component: ModelsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
