import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetosRoutingModule } from './projetos-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';


import { ProjetosComponent } from './projetos.component';

@NgModule({
  declarations: [
    ProjetosComponent
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class ProjetosModule { }
