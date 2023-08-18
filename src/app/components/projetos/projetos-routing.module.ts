import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetosComponent } from './projetos.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [{ path: '', component: ProjetosComponent },
{ path: 'edit', component: EditarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetosRoutingModule { }
