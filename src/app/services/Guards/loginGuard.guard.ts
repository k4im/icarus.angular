import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  constructor(private route: Router,
    private AuthServ: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.AuthServ.verificarCookies()){
        this.route.navigate(["/"])
        return false
    }
    return true
  }

  
}
