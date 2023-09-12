import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { IProdutosPaginados } from 'src/app/Interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  /** Variaveis mutaveis pelos dados da api */
  filtro!: string;
  filtroSelect: string = 'Filtrar por status';
  deleteSub!: Subscription;
  paginaAtual: number = 1;
  ItensPorPagina: number = 5;
  Produtos: IProdutosPaginados = { data: [], paginaAtual: 0, totalDePaginas: 0, totalItens: 0 };
  aguardandoDados: boolean = true;
  loading: boolean = false;
  primeiraRequisicao: boolean = true;
  formSearch!: FormGroup
  dataInical!: Date;
  /** Final das Variaveis */

  constructor(
    private ProdutosService: ProdutosService,
    private toast: NgToastService,
    private builder: FormBuilder) {}

  ngOnInit(): void {
    this.primeiraRequisicao = false;
    this.buscarItens(this.paginaAtual);
    this.formSearch = this.builder.group({
      searchInput: [null, [Validators.required]]
    })  }


  /**
   * 
   * @param pagina Recebe a pagina que será repassada para o serviço realizar a requisição
   * @param resultado Recebe a quantidade de resultado por pagina que será disponibilizado para tela.
   */
  buscarItens(pagina: number, resultado?: number) {
    if(resultado === undefined) {
      this.ProdutosService.buscarProdutos(pagina).subscribe(
        (result) => {
          this.Produtos = result
        },
        (error: HttpErrorResponse) => {
          this.validarResponse(error);
        },
        () => { 
          if (this.primeiraRequisicao) {
            this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
          }
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    } else{
      this.ProdutosService.buscarProdutos(pagina, resultado).subscribe(
        (result) => {
          this.Produtos = result
        },
        (error: HttpErrorResponse) => {
          this.validarResponse(error);
        },
        () => { 
          if (this.primeiraRequisicao) {
            this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
          }
          this.aguardandoDados = false
          this.loading = false;
        }
      );  
    }
  }

  /**
  * 
  * @param evento recebe a quantidade de 
  * projetos que serão exibidos na tela.
  */
  atualizarItensPorPagina(evento: any) {
    this.loading = true;
    this.buscarItens(this.paginaAtual, evento)
  }
  /** Final metodo que atualiza quantidade de itens por pagina */

  /**
  * 
  * @param event recebe o click de mudança de pagina,
  * para então realizar a requição de mudança de pagina, partindo
  * com a quantidade de itens que estão selecionados no momento do click.
  */
  mudarDePagina(event: any) {
    this.paginaAtual = event;
    this.primeiraRequisicao = false;
    this.loading = true;
    this.buscarItens(this.paginaAtual, this.ItensPorPagina);
  }
  /** Final chamada publica */


  /**
   * 
   * @param error recebe valor HttpErroResponse vindo das APIs utilizadas 
   * verificado o retorno http response, é disparado uma notificação referente a resposta recebida.
   */
  private validarResponse(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
        console.log("Não foi possivel realizar a comunicação!")
        this.loading = false;
        break;

    case 404:
        this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Nenhum projeto foi encontrado!', duration: 2500 })
        console.log("Nenhum projeto foi encontrado!")
        this.loading = false;
        break;
      case 500:
        this.toast.error({ detail: " ❌ Erro", summary: 'O servidor não conseguiu carregar os projetos!', duration: 2500 })
        console.log("Houve um erro no servidor!")
        this.loading = false;
        break
      default:
        this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
        console.log("Não foi possivel realizar a comunicação!")
        this.loading = false;
        break;
    }
  }
  /** Final http response */
}