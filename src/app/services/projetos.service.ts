import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { CriarProjetoDTO, Produto, Projeto, ProjetoUnico, Projetos } from '../Interfaces/IProjetos';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProjetosService {
  
  private readonly urlProjetos: string  = '';

  /** Definiando header padrão para requisições */
  httpHeader = new HttpHeaders({
    'Content-type': 'application/Json',
    'Access-Control-Allow-Origin': '*'
  })
  /** Final header options */

  
  constructor(private http: HttpClient) { 
    if(environment.production) {
      this.urlProjetos = environment.apiGateway
    }
    this.urlProjetos = environment.apiGateway;
  }

  /**
   * 
   * @param pagina Estará recebendo um valor do tipo numerico para que seja possivel passar
   * a pagina que deseja estar verificando.
   * @param resultado Estará recebendo um valor do tipo numerico, onde sera utilizando para filtrar
   * a quantidade de resultados que serão exibidos na tabela.
   * @returns Observable<Projetos> {data: [], totalDePaginas: number, paginaAtual: number, totaldeItens: number}.
   */
  buscarProjetos(pagina: number, resultado?: number): Observable<Projetos> {
    if(resultado === undefined) {
      return this.http.get<Projetos>(`${this.urlProjetos}/projetos/${pagina}/5`)
    }
    return this.http.get<Projetos>(`${this.urlProjetos}/projetos/${pagina}/${resultado}`)
  }
  /**
   * 
   * @param id Recebe um valor do tipo string, onde o mesmo será utiilzado para 
   * realizar a busca a partir do ID do projeto.
   * @returns Observable<ProjetoUnico> {Nome: string, Descrição: string, valor: number, 
   * produtoUtilizado: Object, quantidadeUtilizada: number}
   */
  buscarProjeto(id: string): Observable<ProjetoUnico> {
    return this.http.get<ProjetoUnico>(`${this.urlProjetos}/projeto/${id}`)
  }
  /**
   * 
   * @param id Recebe um {id:string} para realizar a chamada na api do tipo 
   * DELETE.
   * @returns Observable<number>  
   */
  remover(id: string): Observable<number> {
    return this.http.delete<number>(`${this.urlProjetos}/projeto/delete/${id}`, { headers: this.httpHeader })
  }

  /**
   * 
   * @returns Observable<Produto[]>.
   * Estará retornando um array de produtos que podem ser utilizados 
   * para criação de um novo projeto. 
   */
  buscarTodosProdutos(): Observable<Produto[]> {
    let httpHeader = new HttpHeaders({
      'Content-type': 'application/Json',
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.get<Produto[]>(`${this.urlProjetos}/projetos/produtosEmEstoque`, { headers: httpHeader })
  }

  /**
   * 
   * @param projeto estará recebendo data do tipo CriarProjetoDTO, para que seja 
   * possivel estar realizando a chamada de post para API de projetos no backend.
   * @returns Observable<CriarProjetos>
   */
  novoProjeto(projeto: CriarProjetoDTO): Observable<CriarProjetoDTO> {
    return this.http.post<CriarProjetoDTO>(`${this.urlProjetos}/projeto/novo`, projeto);
  }

  /**
   * 
   * @param status recebe valor to tipo string para realizar a mudança de status de um projeto
   * que já se encontra armezanado em banco de dados.
   * @param id recebe um id referente ao projeto que será atualizado o status em questão.
   * @returns Observable
   */
  novoStatus(status: string, id: number){
    let parames = new HttpParams().append("model", status);
    return this.http.put(`${this.urlProjetos}/update/${id}`, status, {params: parames});
  }

  /**
   * 
   * @param filtro Recebe status/nome para realizar a filtragem no banco de dados 
   * e retornar os dados para pagina.
   * @param pagina Recebe o numero da pagina atual que se encontra selecionada pelo
   * frontender.
   * @param resultado Recebe o a quantidade de resultados que serão exibidos referente 
   * a filtragem realizada. 
   * @returns Observable<Projetos>
   */
  FiltrarBusca(filtro: string, pagina: number, resultado? : number) : Observable<Projetos> {
    let parames = new HttpParams().append("filtro", filtro);
    return this.http.get<Projetos>(`${this.urlProjetos}/api/pesquisar/nome/${pagina}/${resultado}`, {params: parames});
  }

   /**
  * 
  * @param filtro Recebe status/nome para realizar a filtragem no banco de dados 
  * e retornar os dados para pagina.
  * @param pagina Recebe o numero da pagina atual que se encontra selecionada pelo
  * frontender.
  * @param resultado Recebe o a quantidade de resultados que serão exibidos referente 
  * a filtragem realizada. 
  * @returns Observable<Projetos>
  */
   FiltrarBuscaStatus(filtro: string, pagina: number, resultado? : number) : Observable<Projetos> {
     let parames = new HttpParams().append("filtro", filtro);
     return this.http.get<Projetos>(`${this.urlProjetos}/api/pesquisar/status/${pagina}/${resultado}`, {params: parames});
   }
  /** Criação de observable para disparo de eventos delete | error  */
  private _listerner = new Subject<any>();
  listen(): Observable<any> {
    return this._listerner.asObservable();
  }
  filterSub(filter: string) {
    this._listerner.next(filter);
 }
 /** Final Criação de observable */ 
}
