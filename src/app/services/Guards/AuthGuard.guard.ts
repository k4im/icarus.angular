import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  estaLogado: boolean = false;
  constructor(private route: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("Chamado o Guard")
    if (this.estaLogado === false){
      this.route.navigate(['/login'])
      return this.estaLogado;
    }
    return this.estaLogado;
  }

  
}
