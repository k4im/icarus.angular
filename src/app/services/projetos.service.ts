import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projeto, Projetos } from '../Interfaces/IProjetos';
import { Observable } from 'rxjs';


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
    let httpHeader = new HttpHeaders().set('Content-type', 'application/Json')
    return this.http.delete<number>(`${this.urlProjetos}/delete/${id}`, { headers: httpHeader })
  }
}
