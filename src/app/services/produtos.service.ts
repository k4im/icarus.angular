import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProdutoNovo, IProdutos, IProdutosPaginados } from '../Interfaces/IProduto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService{

  urlProdutos: string = '';
  constructor(private httpclient: HttpClient) { 
    if(environment.production){
      this.urlProdutos = environment.apiGateway;
    }
    this.urlProdutos = environment.apiGateway;
  
  }

  /**
   * 
   * @param pagina Recebe a pagina que será visualizada através da requisição GET.
   * @param resultado Pode receber o valor da quantidade de itens será disponibilizado em tela.
   * @returns Retorna um objeto do tipo IProdutosPaginados.
   */
  buscarProdutos(pagina: number, resultado?: number) : Observable<IProdutosPaginados>{
    if(resultado !== null && resultado !== undefined) {
      return this.httpclient.get<IProdutosPaginados>(`${this.urlProdutos}/produtos/${pagina}/${resultado}`);    
    }
    return this.httpclient.get<IProdutosPaginados>(`${this.urlProdutos}/produtos/${pagina}/5`);    
  }


  /**
   * @param id Recebe o valor de um produto para que seja realizado a operação GET no backend.
   * @returns retorna um obejeto do tipo IProdutos.
   */
  buscarProduto(id: number): Observable<IProdutos> {
    return this.httpclient.get<IProdutos>(`${this.urlProdutos}/produtos/${id}`);
  }

  /**
   * 
   * @param produto recebe um objecto do tipo IProdutoNovo, onde o mesmo será enviado para api para que seja possivel estar realizando a criação do mesmo.
   * @returns retorna um observavel.
   */
  criarProduto(produto: IProdutoNovo) {
    return this.httpclient.post<IProdutoNovo>(`${this.urlProdutos}/produtos/novo`, produto);
  }

  deletarProduto(id: string) {
    return this.httpclient.delete(`${this.urlProdutos}/produtos/delete/${id}`);
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
