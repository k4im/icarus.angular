import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { IProdutos, IProdutosPaginados } from 'src/app/Interfaces/IProduto';
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
    let produto: IProdutos = {
      id: '0',
      nome: this.nomeGetter.value,
      quantidade: this.quantidadeGetter.value,
      valor: this.valorGetter.value
    }
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
}
