import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjetoRoutingModule } from './edit-projeto-routing.module';
import { EditProjetoComponent } from './edit-projeto.component';

import { HttpClientModule } from '@angular/common/http';
import { ProjetosService } from 'src/app/services/projetos.service';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';
import { SharedModule } from 'src/app/commons/shared.module';


@NgModule({
  declarations: [
    EditProjetoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EditProjetoRoutingModule,
    SharedCommonModule,
    SharedModule
  ],
  providers: [ProjetosService]
})
export class EditProjetoModule { }
