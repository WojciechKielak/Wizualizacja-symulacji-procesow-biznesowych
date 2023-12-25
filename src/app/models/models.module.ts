import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ModelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
  ]
})
export class ModelsModule { }
