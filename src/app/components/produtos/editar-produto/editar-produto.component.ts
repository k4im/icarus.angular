import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IProdutos } from 'src/app/Interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent {

  /** Variaveis inicializadas */
  selectId!: any;
  Produto: IProdutos = {
    id: 0,
    nome: '',
    quantidade: 0,
    valor: 0,
  };
  formProduto!: FormGroup;
  /** Final variaveis */

  /**Inicializado construtor para injeção de depdenciais */
  constructor(
    private routerActive: ActivatedRoute,
    private route: Router,
    private toast: NgToastService,
    private produtoService: ProdutosService,
    private builder: FormBuilder) { }
  /** Final construtor de injeção de dependencias */

  /** Realizando chamada ao serviço ao inicializar o component */
  ngOnInit(): void {
    this.routerActive.params.subscribe(
      (params) => { this.selectId = params['id']; }
    );
    this.buscarProduto(this.selectId);
    
    this.formProduto = this.builder.group(
      { nome: [null, [Validators.required]],
        valor: [null, [Validators.required]],
        quantidade: [null, [Validators.required]],
      });
  }
  /** Finalizando chamada ao inicializar o component */

  /** Metodo privado para busca de projeto */
  private buscarProduto(id: number) {
    this.produtoService.buscarProduto(this.selectId).subscribe(
      (result) => {
        this.Produto = result;
      },
      (Error: HttpErrorResponse) => {
        this.validarResponse(Error);
      }
    );
  }
  /** Final de metodo privado */

  redirecionar() {
    this.route.navigate(["/produtos"])
  }
  /** Final metodos vinculados */

  submitProduto() {
  }

  /** Getters */
  get nomeGetter() {
    return this.formProduto.get("novoStatus")!
  }
  get valorGetter(){
    return this.formProduto.get("valor")!
  }
  get quantidadeGetter(){
    return this.formProduto.get("quantidade")!
  }
  /** Final getters */
  
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
      break;
    case 200:
      break;
    case 404:
      this.toast.warning({ detail: "⚠️ Não foi possivel estar localizando o projeto", summary: 'Servidor repsondeu com status: 404!', duration: 2500 })
      console.log("Nenhum projeto foi encontrado!")
      break;
    case 500:
      this.toast.error({ detail: "❌ Não foi possivel atualizar o projeto, pois ocorreu um erro no servidor", summary: 'Servidor respondeu com status: 500!', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    case 400:
      this.toast.error({ detail: "❌ Não foi possivel atualizar o projeto, pois o modelo é invalido", summary: 'Servidor respondeu com status: 400!', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    case 409:
      this.toast.error({ detail: "❌ Não foi possivel estar atualizando o projeto!", summary: 'Servidor respondeu com status: 409', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    default:
      this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
      console.log("Não foi possivel realizar a comunicação!")
      break;
  }
}
/** Final http response */
}
