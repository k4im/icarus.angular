import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';


@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    CommonModule,
    SharedCommonModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
