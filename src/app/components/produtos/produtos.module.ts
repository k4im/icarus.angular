import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { SharedModule } from "../../commons/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoprodutoComponent } from './novoproduto/novoproduto.component';
import { RemoverProdutoComponent } from './remover-produto/remover-produto.component';


@NgModule({
    declarations: [
        ProdutosComponent,
        NovoprodutoComponent,
        RemoverProdutoComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        NgxSkeletonLoaderModule,
        NgToastModule,
        FormsModule,
        ReactiveFormsModule,
        SharedCommonModule,
        ProdutosRoutingModule,
        SharedModule
    ],
    providers: [NgToastService]
})
export class ProdutosModule { }
