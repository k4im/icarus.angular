import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projeto, Projetos } from '../Interfaces/IProjetos';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  private urlProjetos = "http://localhost:5086/api";
  constructor(private http: HttpClient) { }

  buscarProjetos(pagina: number, resultado?: number): Observable<Projetos> {
    return this.http.get<Projetos>(`${this.urlProjetos}/projetos/${pagina}`)
  }
  buscarProjeto(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.urlProjetos}/projeto/${id}`)
  }
  remover(id: string): Observable<number> {
    let httpHeader = new HttpHeaders({
      'Content-type': 'application/Json',
      'Access-Control-Allow-Origin' : '*'
    })
    return this.http.delete<number>(`${this.urlProjetos}/delete/${id}`, { headers: httpHeader})
  }

  private _listerner = new Subject<any>();
  listen() : Observable<any> {
    return this._listerner.asObservable();
  }
  filterSub(filter: string){
    this._listerner.next(filter);
  }
}
