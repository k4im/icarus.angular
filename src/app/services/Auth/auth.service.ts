import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
      })
    );
  }

  /**
   * 
   * @param login Recebe um valor do tipo IAuthLogin, onde sera passado {chave: string, pwd: string},
   * o mesmo sera salvo dentro de localstorage para que futuramente 
   * possa ser possivel realizar login de forma automatica.
   * @returns IToken {AccessToken: string, RefreshToken: string}
   */
  salvarLogin(login: IAuthLogin) : Observable<IToken> {
    let time = new Date()
    let ttl = time.getTime() + (60 * 20);
    let item = {
      chave: login.chaveDeAcesso, 
      pwd: login.senha,
      expiry: ttl}

    return this.httpClient.post<IToken>(`${this.urlAuthApi}/auth/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken);
        this.cookie.set("RefreshToken", response.refrehsToken, .1);

        localStorage.setItem("lembrarLogin", JSON.stringify(item));
      })
    );
  }

  /**
   * 
   * @param item recebe um item do tipo {chave: string, pwd: string, expiry: number};
   * o mesmo deve ser encontrado através do localstorage, para que possa ser realizado login de forma automatica
   * caso seja marcado a opção de lembrar login.
   * @returns IToken {AccessToken: string, RefreshToken: string}
   */
  realizarLoginAutomatico(item: {chave: string, pwd: string, expiry: number}) : Observable<IToken> {
    let login: IAuthLogin = {chaveDeAcesso: item.chave, senha: item.pwd}
    
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/auth/login`, login).pipe(
      tap((response: IToken) => {
        this.cookie.set("AccessToken", response.accessToken);
        this.cookie.set("RefreshToken", response.refrehsToken);
      })
    )
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
    if( dataExpToken < dateNow) {
      // Implementar logica
    } else {
      // Implementar lógica
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
