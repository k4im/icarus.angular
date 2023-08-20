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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ProjetosComponent } from './projetos.component';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { ProjetosService } from 'src/app/services/projetos.service';
import { NgToastModule } from 'ng-angular-popup';
import { EditarProjetoComponent } from './editar-projeto/editar-projeto.component';

@NgModule({
  declarations: [
    ProjetosComponent,
    RemoverProjetoComponent,
    EditarProjetoComponent,
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
    NgToastModule,
    NgxSkeletonLoaderModule,
    NgxPaginationModule
  ],
  providers: [ProjetosService]
})
export class ProjetosModule { }
