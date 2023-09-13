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
  filtroSelect: string = 'Filtrar por status';
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

  /**
   * 
   * @param evento recebe a quantidade de 
   * projetos que serão exibidos na tela.
   */
  atualizarItensPorPagina(evento: any) {
    this.loading = true;
    this.buscarProjetos(this.paginaAtual, evento)
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
    this.buscarProjetos(this.paginaAtual, this.ItensPorPagina);
  }
  /** Final chamada publica */

  /**
   * 
   * @param eventoClick receve data do tipo Projeto
   * onde o mesmo será utilizado para recuperar o id do projeto em questão
   * para que então seja possivel estar realizando a remoção do mesmo.
   */
  abrirDialogDelete(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(RemoverProjetoComponent, {
      data: { id: eventoClick.id, nome: eventoClick.nome }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /** Final metodo de remoção ao projeto */

  /**
   * 
   * @param eventoClick Recebe o eventoClick que neste caso será do tipo Projeto
   * para que então sejá possivel estar realizando a mudança de pagina através de router com
   * o id referente ao projeto desejado.
   */
  editarProjeto(eventoClick: Projeto): void {
    this.route.navigate(["/editar", eventoClick.id])
  }
  /** Final abrir modal edit */

  /**
   * 
   * @param pagina recebe o numero da pagina desejada.
   * @param resultado Pode estar recebendo valor de quantidade de dados que serão 
   * disponibilizados na tela.
   */
  private buscarProjetos(pagina: number, resultado?: number) {
    if (resultado === undefined) {
      this.projetoService.buscarProjetos(pagina).subscribe(
        (result: Projetos) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
        },
        (erro: HttpErrorResponse) => {
          this.validarResponse(erro)
        },
        () => {
          this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    }
    else if (this.filtroSelect !== null && this.filtroSelect !== undefined && this.filtroSelect !== 'Filtrar por status') {
      this.projetoService.FiltrarBuscaStatus(this.filtroSelect, pagina, resultado).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
          this.ItensPorPagina = resultado
        },
        (erro: HttpErrorResponse) => {
          this.validarResponse(erro)
        },
        () => {
          this.aguardandoDados = false
          this.loading = false;
        }
      )
    }
    else if (this.filtro !== null && this.filtro !== undefined && this.filtro !== '') {
      this.projetoService.FiltrarBusca(this.filtro, pagina, resultado).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
          this.ItensPorPagina = resultado
        },
        (erro: HttpErrorResponse) => {
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
        (erro: HttpErrorResponse) => {
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
  /**
   * 
   * @param id recebe o {id:string} para que seja possivel realizar
   * disparo da notificação referente ao produto que foi deletado.
   */
  private atualizarPagina(id: string) {
    let param = parseInt(id);
    this.Projetos.data = this.Projetos.data.filter((p: Projeto) => p.id !== param)
    this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Projeto deletado com sucesso!', duration: 750 })
  }
  /** Final metodos de chamadas ao serviço */

  /** Metodo utilizado para realizar consulta em status e nome */
  filtrarTabela() {
    this.filtro = this.searchFilter.value;
    if (this.filtro !== null && this.filtro !== '') {
      this.loading = true;
      this.projetoService.FiltrarBusca(this.filtro, this.paginaAtual, this.ItensPorPagina).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
        },
        (erro: HttpErrorResponse) => {
          this.validarResponse(erro);
        },
        () => {
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    }
    if (this.filtro === '') {
      this.limparFiltro();
    }
  }

  limparFiltro() {
    this.filtro = "";
    this.formSearch.reset();
    document.getElementById("searchInput")
    this.loading = true;
    this.buscarProjetos(this.paginaAtual, this.ItensPorPagina);
  }
  /**
   * 
   * @param evento recebe um evento que neste caso 
   * sera as options de um select onde o mesmo será utilizado para realizar a filtragem
   * dos dados a partir do status solicitado.
   */
  filtrarPorStatus(evento: any) {
    if (evento === "Filtrar por status") {
      this.loading = true;
      this.buscarProjetos(this.paginaAtual, this.ItensPorPagina);
    }
    else {
      console.log(evento);
      this.filtroSelect = evento
      this.loading = true;
      this.projetoService.FiltrarBusca(this.filtroSelect, this.paginaAtual, this.ItensPorPagina).subscribe(
        (result) => {
          this.Projetos = result
          this.paginaAtual = result.paginaAtual
        },
        (erro: HttpErrorResponse) => {
          this.validarResponse(erro);
        },
        () => {
          this.aguardandoDados = false
          this.loading = false;
        }
      );
    }
  }
  /** Final metodo para buscar status ou nome */

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
      case 200:
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

  /**
   * 
   * @param projeto recebe Projeto através de *ngFor para verificar qual status se encontra presente.
   * Identificado o status presente é atribuido a classe referente a tal status.
   * @returns Classes CSS referentes ao status especifico.
   */
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