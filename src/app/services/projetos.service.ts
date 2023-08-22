import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { CriarProjetoDTO, Produto, Projeto, ProjetoUnico, Projetos } from '../Interfaces/IProjetos';
import { Observable, Subject, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjetosService {
  
  private urlProjetos = "http://localhost:5086/api";

  /** Definiando header padrão para requisições */
  httpHeader = new HttpHeaders({
    'Content-type': 'application/Json',
    'Access-Control-Allow-Origin': '*'
  })
  /** Final header options */

  
  constructor(private http: HttpClient) { }

  buscarProjetos(pagina: number, resultado?: number): Observable<Projetos> {
    return this.http.get<Projetos>(`${this.urlProjetos}/projetos/${pagina}`)
  }

  buscarProjeto(id: string): Observable<ProjetoUnico> {
    return this.http.get<ProjetoUnico>(`${this.urlProjetos}/projeto/${id}`)
  }
  remover(id: string): Observable<number> {
    return this.http.delete<number>(`${this.urlProjetos}/delete/${id}`, { headers: this.httpHeader })
  }

  buscarTodosProdutos(): Observable<Produto[]> {
    let httpHeader = new HttpHeaders({
      'Content-type': 'application/Json',
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.get<Produto[]>(`${this.urlProjetos}/produtosEmEstoque`, { headers: httpHeader })
  }

  novoProjeto(projeto: CriarProjetoDTO): Observable<CriarProjetoDTO> {
    return this.http.post<CriarProjetoDTO>(`${this.urlProjetos}/Create`, projeto);
  }

  novoStatus(status: string, id: number){
    let parames = new HttpParams().append("model", status);
    return this.http.put(`${this.urlProjetos}/update/${id}`, status, {params: parames});
  }

  /** Criação de observable para disparo de eventos delete | error  */
  private _listerner = new Subject<any>();
  listen(): Observable<any> {
    return this._listerner.asObservable();
  }
  filterSub(filter: string) {
    this._listerner.next(filter);
 
 /** Final Criação de observable */ }
}
