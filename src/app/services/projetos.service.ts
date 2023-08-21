import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CriarProjetoDTO, Produto, Projeto, Projetos } from '../Interfaces/IProjetos';
import { Observable, Subject, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  private urlProjetos = "http://localhost:5086/api";
  constructor(private http: HttpClient) { }

  // Buscar todos os projetos paginados da api.
  buscarProjetos(pagina: number, resultado?: number): Observable<Projetos> {
    return this.http.get<Projetos>(`${this.urlProjetos}/projetos/${pagina}`)
  }
  // Metodo que estará realizando chamada do projeto pelo id
  buscarProjeto(id: string): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.urlProjetos}/projeto/${id}`)
  }
  // Metodo que relaiza chamada a api para relaizar operação de delete.
  remover(id: string): Observable<number> {
    let httpHeader = new HttpHeaders({
      'Content-type': 'application/Json',
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.delete<number>(`${this.urlProjetos}/delete/${id}`, { headers: httpHeader })
  }

  //Metodo de busca para produtos que irão ser disponibilizados na pagina de cirar produtos.  
  buscarTodosProdutos(): Observable<Produto[]> {
    let httpHeader = new HttpHeaders({
      'Content-type': 'application/Json',
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.get<Produto[]>(`${this.urlProjetos}/produtosEmEstoque`, { headers: httpHeader })
  }
  // Metodo para realizar a criação de um novo projeto.
  novoProjeto(projeto: CriarProjetoDTO): Observable<CriarProjetoDTO> {
    return this.http.post<CriarProjetoDTO>(`${this.urlProjetos}/Create`, projeto);
  }

  //Metodo para update de status
  novoStatus(status: string, id: number): Observable<string>{
    return this.http.put<string>(`${this.urlProjetos}/update/${id}?model=`, status);
  }

  // Realizado a criação de um observable.
  private _listerner = new Subject<any>();
  listen(): Observable<any> {
    return this._listerner.asObservable();
  }
  filterSub(filter: string) {
    this._listerner.next(filter);
  }
}
