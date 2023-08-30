import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';
import { NovoProjetoRoutingModule } from './novo-projeto-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProjetosService } from 'src/app/services/projetos.service';


import { NovoProjetoComponent } from './novo-projeto.component';

@NgModule({
  declarations: [
    NovoProjetoComponent
  ],
  imports: [
    CommonModule,
    NovoProjetoRoutingModule,
    NgxSkeletonLoaderModule,
    SharedCommonModule,
  ],
  providers: [ProjetosService, DatePipe]
})
export class NovoProjetoModule { }
