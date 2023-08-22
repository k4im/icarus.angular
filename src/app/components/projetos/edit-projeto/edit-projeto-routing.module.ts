import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjetoComponent } from './edit-projeto.component';

const routes: Routes = [{ path: '', component: EditProjetoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjetoRoutingModule { }
