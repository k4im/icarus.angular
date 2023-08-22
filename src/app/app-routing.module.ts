import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'projetos', loadChildren: () => import('./components/projetos/projetos.module').then(m => m.ProjetosModule) },
  { path: 'projetos/novo', loadChildren: () => import('./components/projetos/novo-projeto/novo-projeto.module').then(m => m.NovoProjetoModule) },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'editar/:id', loadChildren: () => import('./components/projetos/edit-projeto/edit-projeto.module').then(m => m.EditProjetoModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
