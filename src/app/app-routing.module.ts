import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/Guards/AuthGuard.guard';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { loginGuard } from './services/Guards/loginGuard.guard';
import { NovoprodutoComponent } from './components/produtos/novoproduto/novoproduto.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  { path: 'navigation', canActivate: [AuthGuard], component: NavigationComponent},
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'projetos', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/projetos.module').then(m => m.ProjetosModule) },
  { path: 'projetos/novo', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/novo-projeto/novo-projeto.module').then(m => m.NovoProjetoModule) },
  {
    path: '',
    redirectTo: '/navigation',
    pathMatch: 'full'
  },
  { path: 'editar/:id', canActivate: [AuthGuard], loadChildren: () => import('./components/projetos/edit-projeto/edit-projeto.module').then(m => m.EditProjetoModule) },
  { path: 'login', canActivate: [loginGuard], loadChildren: () => import('./layouts/login/login.module').then(m => m.LoginModule) },
  { path: 'produtos', canActivate: [AuthGuard], loadChildren: () => import('./components/produtos/produtos.module').then(m => m.ProdutosModule) },
  {path: 'novo_produto', canActivate: [AuthGuard], component: NovoprodutoComponent},
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
