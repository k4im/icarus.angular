import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProdutosPaginados } from 'src/app/Interfaces/IProduto';

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

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  atualizarItensPorPagina(evento: any) {

  }

  filtrarPorStatus(evento: any) {

  }
  mudarDePagina(evento: any) {

  }

}
