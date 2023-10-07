import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ModelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class ModelsModule { }
