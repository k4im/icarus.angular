import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarProdutoRoutingModule } from './editar-produto-routing.module';
import { EditarProdutoComponent } from './editar-produto.component';
import { SharedModule } from 'src/app/commons/shared.module';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';


@NgModule({
  declarations: [
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    SharedCommonModule,
    SharedModule,
    EditarProdutoRoutingModule
  ]
})
export class EditarProdutoModule { }
