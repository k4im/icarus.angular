import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly urlAuthApi: string = '';
  constructor(private httpClient: HttpClient) { 
    if(environment.production) {
      this.urlAuthApi = environment.apiUrlAuth;
    }
    this.urlAuthApi = environment.apiUrlAuth;
  }

  realizarLogin(login: IAuthLogin): Observable<IToken> {
    return this.httpClient.post<IToken>(`${this.urlAuthApi}/login`, login).pipe(
      tap((response: IToken)=> {
        localStorage.setItem("Token", response.accessToken);
        console.log(response.accessToken);
      })
    );
  }

  verificarTeste() {
    return (localStorage.getItem("Token")) ? true :false ;
  }
  logout() {
    localStorage.clear();
  }

  private _listerner = new Subject<any>();
  listen(): Observable<any> {
    return this._listerner.asObservable();
  }
  filterSub(filter: string) {
    this._listerner.next(filter);
  }
  
}
