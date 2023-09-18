import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLoggedIn!: boolean;
  isLoggedObservable!: BehaviorSubject<boolean>
  
  /** Helper de verificação de JWT.
   */
  helper = new JwtHelperService();

  private readonly urlAuthApi: string = '';
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService) {
    if (environment.production) {
      this.urlAuthApi = environment.apiGateway;
    }
    this.urlAuthApi = environment.apiGateway;
  }

  /**
   * 
   * @param login Recebe um valor do tipo IAuthLogin, onde sera passado {chave: string, pwd: string},
   * para que seja possivel estar realizando login.
   * @returns IToken {AccessToken: string, RefreshToken: string}
   */
  realizarLogin(login: IAuthLogin): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/auth/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken);
        this.cookie.set("RefreshToken", response.refrehsToken);
        localStorage.setItem("User", login.chaveDeAcesso)
      })
    );
  }
 
  /** Função estará verificando se o token de acesso se encontra expirado
   * em caso positivo será redirecionado para area de login para que seja possivel realizar
   * novamente o a geração do token de acesso assim como  o token de refresh.
   */
  verificarCookies() {
    this.verificarDataDeExpiracaoToken(this.cookie.get("AccessToken"))
    const isTokenExpired = this.helper.isTokenExpired(this.cookie.get("AccessToken"));
    if(isTokenExpired) {
      this.cookie.deleteAll();
      this.isLoggedIn = false;
    }else {
      this.isLoggedIn = true
    }
    return this.isLoggedIn
  }
  
  verificarDataDeExpiracaoToken(token: string){
    const dateNow = new Date();
    const dataExpToken = this.helper.getTokenExpirationDate(token)! 
    if( dataExpToken === dateNow) {
    const parames = new HttpParams().append("chave", localStorage.getItem("User")!).append("token", this.cookie.get("RefreshToken"))
      this.httpClient.post<IToken>(`${this.urlAuthApi}/auth/refreshtoken`, {param: parames}).pipe(
        tap((response: IToken) => {
          this.cookie.deleteAll();
          this.cookie.set("AccessToken", response.accessToken);
          this.cookie.set("RefreshToken", response.refrehsToken);
        })
      )
    }
  }
  /**
   * Estara realizando o logout do frontend
   * realizando a remoção dos tokens que se encontram armazenados como 
   * cookie no browser do client.
   */
  logout() {
    this.isLoggedIn = false
    this.cookie.deleteAll();
    localStorage.clear();
  }
}
