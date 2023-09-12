import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProdutos, IProdutosPaginados } from '../Interfaces/IProduto';

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
    return this.httpclient.get<IProdutosPaginados>(`${this.urlProdutos}/produtos/${pagina}`);    
  }


  /**
   * @param id Recebe o valor de um produto para que seja realizado a operação GET no backend.
   * @returns retorna um obejeto do tipo IProdutos.
   */
  buscarProduto(id: number): Observable<IProdutos> {
    return this.httpclient.get<IProdutos>(`${this.urlProdutos}/produtos/${id}`);
  }

}
