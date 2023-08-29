import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado:boolean = false;
  
  private readonly urlAuthApi: string = '';
  constructor(private httpClient: HttpClient) { 
    if(environment.production) {
      this.urlAuthApi = environment.apiUrlAuth;
    }
    this.urlAuthApi = environment.apiUrlAuth;
  }

  realizarLogin(login: IAuthLogin): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/login`, login);
  }
}
