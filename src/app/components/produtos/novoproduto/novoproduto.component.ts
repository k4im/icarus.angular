import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { IProdutoNovo, IProdutos, IProdutosPaginados } from 'src/app/Interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-novoproduto',
  templateUrl: './novoproduto.component.html',
  styleUrls: ['./novoproduto.component.scss']
})
export class NovoprodutoComponent {


  regexDate = new RegExp('/^\d{2}\/\d{2}\/\d{4}$/')
  formGroupProjetos!: FormGroup;

  ProdutosEmEstoque!: IProdutosPaginados;


  aguardandoDados: boolean = true;
  projetoEnviado: boolean = false;

  /** Construtor */
  constructor(
    public dialog: MatDialog,
    private produtoServices: ProdutosService,
    private toast: NgToastService,
    private route: Router,
    private buider: FormBuilder) {
    
  }
  /** Final construtor */

  /** Operações realizadas ao inicilizar component */
  ngOnInit(): void {
    this.formGroupProjetos = this.buider.group({
      nome: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      })
  }
  
  submitProjeto() {
    if(this.formGroupProjetos.valid){
      let produto: IProdutoNovo = {
        nome: this.nomeGetter.value,
        quantidade: this.quantidadeGetter.value,
        valor: this.valorGetter.value
      }
      this.criarProduto(produto);
    }
    console.log("Por favor insira os valores corretos nos campos");
  }

  /**
   * 
   * @param produto recebe um objeto do tipo produto, onde o mesmo será repassado para o serviço
   */
  criarProduto(produto: IProdutoNovo) {
    this.produtoServices.criarProduto(produto).subscribe(
      (result) => {
        console.log("produto criado com sucesso!");
      },
      (error: HttpErrorResponse) => {
        this.validarResponse(error);
      },
      () => {
        this.redirecionar();
      }
    )
  }
  // Função caso deseje cancelar a criação de um projeto
  redirecionar() {
    this.route.navigate(["/produtos"])
  }  


  /**
   * Getters
   */

  get nomeGetter() {
    return this.formGroupProjetos.get('nome')!
  }
  get valorGetter() {
    return this.formGroupProjetos.get('valor')!
  }
  get quantidadeGetter() {
    return this.formGroupProjetos.get('quantidade')!
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

      case 201:
        this.redirecionar();
        break;
                
      case 404:
        this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Nenhum projeto foi encontrado!', duration: 2500 })
        console.log("Nenhum projeto foi encontrado!")
        break;
      case 500:
        this.toast.error({ detail: " ❌ Erro", summary: 'O servidor não conseguiu carregar os projetos!', duration: 2500 })
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
