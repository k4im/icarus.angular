import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router,
    private AuthServ: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.AuthServ.verificarCookies()){
      return this.AuthServ.verificarCookies();
    }
    this.route.navigate(['/login'])
    return this.AuthServ.verificarCookies();
  }

  
}
