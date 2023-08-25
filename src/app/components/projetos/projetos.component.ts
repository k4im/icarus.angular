import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projeto, Projetos } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent implements OnInit, OnDestroy {

  /** Variaveis mutaveis pelos dados da api */
  filtro!: string;
  deleteSub!: Subscription;
  paginaAtual: number = 1;
  ItensPorPagina: number = 5;
  Projetos: Projetos = { data: [], paginaAtual: 0, totalDePaginas: 0, totalItens: 0 };
  aguardandoDados: boolean = true;
  loading: boolean = false;
  primeiraRequisicao: boolean = true;
  formSearch!: FormGroup
  dataInical!: Date;
  /** Final das Variaveis */

  /** Construtor */
  constructor(
    public dialog: MatDialog,
    private projetoService: ProjetosService,
    private toast: NgToastService,
    private route: Router,
    private buider: FormBuilder) {
    this.deleteSub = this.projetoService.listen().subscribe((m: any) => {
      console.log("Removido projeto: " + m);
      this.atualizarPagina(m);
    })
  }
  /** Final construtor */

  /** Operações realizadas ao inicilizar component */
  ngOnInit(): void {
    this.primeiraRequisicao = false;
    this.buscarProjetos(this.paginaAtual);
    this.formSearch = this.buider.group({
      searchInput: [null, [Validators.required]]
    })
  }
  /** Final Operações realizadas */

  /** Metodo utilizado para atualizar quantidade de resultados por pagina */
  atualizarItensPorPagina(evento: any) {
    this.loading = true;
    this.buscarProjetos(this.paginaAtual, evento)
  }
  /** Final metodo que atualiza quantidade de itens por pagina */
 

 
  /** Chamada publica ao evento de click ao mudar de pagina */
  mudarDePagina(event: any) {
    this.paginaAtual = event;
    this.primeiraRequisicao = false;
    this.loading = true;
    this.buscarProjetos(this.paginaAtual, this.ItensPorPagina);
  }
  /** Final chamada publica */

  /** Metodo para abrir modal de remoção do projeto */
  abrirDialogDelete(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(RemoverProjetoComponent, {
      data: { id: eventoClick.id, nome: eventoClick.nome }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /** Final metodo de remoção ao projeto */

  /** Metodo para abrir modal de Edição */
  editarProjeto(eventoClick: Projeto): void {
    this.route.navigate(["/editar", eventoClick.id])
  }
  /** Final abrir modal edit */

  /** Metodos de chamadas ao serviço */
  private buscarProjetos(pagina: number, resultado?: number) {
    if (resultado === undefined) {
      this.projetoService.buscarProjetos(pagina).subscribe(
        (result: Projetos) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
        },
        (erro : HttpErrorResponse) => {
          this.validarResponse(erro)
        },
        () => {
          this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    }
    else if (this.filtro !== null && this.filtro !== undefined && this.filtro !== ''){
      console.log('Filtro é ' + this.filtro)
      this.projetoService.FiltrarBusca(this.filtro, pagina, resultado).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
          this.ItensPorPagina = resultado
        },
        (erro : HttpErrorResponse) => {
          this.validarResponse(erro)
        },
        () => {
          this.aguardandoDados = false
          this.loading = false;
        }
      )
    }
    else {
      this.projetoService.buscarProjetos(pagina, resultado).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
          this.ItensPorPagina = resultado
        },
        (erro : HttpErrorResponse) => {
          this.validarResponse(erro)
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

  private atualizarPagina(id: string) {
    let param = parseInt(id);
    this.Projetos.data = this.Projetos.data.filter((p: Projeto) => p.id !== param)
    this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Projeto deletado com sucesso!', duration: 750 })
  }
  /** Final metodos de chamadas ao serviço */

  /** Metodo utilizado para realizar consulta em status e nome */
  filtrarTabela() {
    this.filtro = this.searchFilter.value;
    if(this.filtro !== null) {
      this.loading = true;
      this.projetoService.FiltrarBusca(this.filtro, this.paginaAtual, this.ItensPorPagina).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
        },
        (erro : HttpErrorResponse) => {
          this.validarResponse(erro);
        },
        () => {
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    }
  }

  limparFiltro(){
    this.filtro = "";
    this.formSearch.reset();
    document.getElementById("searchInput")
    this.loading = true;
    this.buscarProjetos(this.paginaAtual, this.ItensPorPagina);
  }
  /** Final metodo para buscar status ou nome */

  /** Validadores de httpResponse */
  private validarResponse(error : HttpErrorResponse){
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

 /** Validar status do projeto para adicionar adequadamente as classes ao status */
  validarStatus(projeto: Projeto): string {
    switch (projeto.status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Produção":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Atrasado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }
  /** Final validação */


  /** Getters para forms */
  get searchFilter() {
    return this.formSearch.get("searchInput")!
  }
  /** Final Getters de forms */

  /** Metodo executado quando o componente é destruido */
  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }
  /** Final metodo de destruição */
}