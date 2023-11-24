import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class ReportModule { }
