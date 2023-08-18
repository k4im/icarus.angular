import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoProjetoComponent } from './novo-projeto.component';

const routes: Routes = [{ path: '', component: NovoProjetoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovoProjetoRoutingModule { }
