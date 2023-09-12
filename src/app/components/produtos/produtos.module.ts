import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { SharedCommonModule } from 'src/app/commons/sharedCommon.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from "../../commons/shared.module";


@NgModule({
    declarations: [
        ProdutosComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        NgxSkeletonLoaderModule,
        NgToastModule,
        SharedCommonModule,
        ProdutosRoutingModule,
        SharedModule
    ]
})
export class ProdutosModule { }
