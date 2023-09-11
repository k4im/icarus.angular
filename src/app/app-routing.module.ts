import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/Guards/AuthGuard.guard';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { loginGuard } from './services/Guards/loginGuard.guard';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'projetos', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/projetos.module').then(m => m.ProjetosModule) },
  { path: 'projetos/novo', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/novo-projeto/novo-projeto.module').then(m => m.NovoProjetoModule) },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'editar/:id', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/edit-projeto/edit-projeto.module').then(m => m.EditProjetoModule) },
  { path: 'login', canActivate: [loginGuard], loadChildren: () => import('./layouts/login/login.module').then(m => m.LoginModule) },
  { path: 'produtos', loadChildren: () => import('./components/produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
