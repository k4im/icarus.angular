import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetosRoutingModule } from './projetos-routing.module';
import { SharedModule } from 'src/app/commons/shared.module';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ProjetosComponent } from './projetos.component';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { ProjetosService } from 'src/app/services/projetos.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProjetosComponent,
    RemoverProjetoComponent,
  ],
  imports: [
    CommonModule,
    ProjetosRoutingModule,
    SharedCommonModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [ProjetosService]
})
export class ProjetosModule { }
