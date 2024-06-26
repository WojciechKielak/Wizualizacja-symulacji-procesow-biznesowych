import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ReportComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatListModule,
    RouterModule,
  ],
  exports:[ MatTableModule ]
})
export class ReportModule { }
