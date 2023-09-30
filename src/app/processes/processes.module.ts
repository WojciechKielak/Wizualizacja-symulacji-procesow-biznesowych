import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesComponent } from './processes.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    ProcessesComponent,
  ],
  imports: [
    CommonModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ]
})
export class ProcessesModule { }
