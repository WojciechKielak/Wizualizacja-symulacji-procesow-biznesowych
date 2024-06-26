import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesComponent } from './processes.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    ProcessesComponent,
  ],
  imports: [
    CommonModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
  ]
})
export class ProcessesModule { }
