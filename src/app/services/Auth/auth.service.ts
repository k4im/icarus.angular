import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLoggedIn!: boolean;
  
  helper = new JwtHelperService();

  private readonly urlAuthApi: string = '';
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService) {
    if (environment.production) {
      this.urlAuthApi = environment.apiUrlAuth;
    }
    this.urlAuthApi = environment.apiUrlAuth;
  }

  realizarLogin(login: IAuthLogin): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken);
        this.cookie.set("RefreshToken", response.refrehsToken);
      })
    );
  }
  salvarLogin(login: IAuthLogin) : Observable<IToken> {
    let time = new Date()
    let ttl = time.getTime() + (60000 * 20);

    let item = {
      chave: login.chaveDeAcesso, 
      pwd: login.senha,
      expiry: ttl}
    
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken, {expires: ttl});
        this.cookie.set("RefreshToken", response.refrehsToken);

        localStorage.setItem("lembrarLogin", JSON.stringify(item));
      })
    );
  }
  realizarLoginAutomatico(item: {chave: string, pwd: string, expiry: number}) : Observable<IToken> {
    let login: IAuthLogin = {chaveDeAcesso: item.chave, senha: item.pwd}
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken);
        this.cookie.set("RefreshToken", response.refrehsToken);
      })
    )
  }
  verificarCookies() {
    const isTokenExpired = this.helper.isTokenExpired(this.cookie.get("AccessToken"));
    
    if(isTokenExpired) {
      console.log('Expirou')
      this.isLoggedIn = false;
    }else {
      this.isLoggedIn = true
    }
    return this.isLoggedIn
  }
  logout() {
    this.isLoggedIn = false
    this.cookie.deleteAll();
    localStorage.clear();
  }
}
