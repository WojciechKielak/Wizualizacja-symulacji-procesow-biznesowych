import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelsComponent } from './models/models.component';
import { ProcessesComponent } from './processes/processes.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path:'models', component: ModelsComponent},
  // { path:'models/processes', component: ProcessesComponent},
  { path:'report', component: ReportComponent},
  // { path:'processes', component: ProcessesComponent},
  // { path:'**',component: ProcessesComponent},
  { path:'processes/:processesid', component: ProcessesComponent},
  // { path: 'processes/:processesid', loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesModule) 
  // , canActivate: [LoginGuard]
// },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
