import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projeto, Projetos } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent implements OnInit, OnDestroy {
  
  /** Variaveis mutaveis pelos dados da api */
  deleteSub!: Subscription;
  paginaAtual: number = 1;
  Projetos: Projetos = { data: [], paginaAtual: 0, totalDePaginas: 0, totalItens: 0 };
  aguardandoDados: boolean = true;
  /** Final das Variaveis */
  
  /** Construtor */
  constructor(
    public dialog: MatDialog, 
    private projetoService: ProjetosService, 
    private toast: NgToastService,
    private route: Router) {
    this.deleteSub = this.projetoService.listen().subscribe((m: any) => {
      console.log("Removido projeto: " + m);
      this.atualizarPagina(m);
    })
  }
  /** Final construtor */

  /** Operações realizadas ao inicilizar component */
  ngOnInit(): void {
    this.buscarProjetos(this.paginaAtual);
  }
  /** Final Operações realizadas */

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

  /** Chamada publica ao evento de click ao mudar de pagina */
  mudarDePagina(event: any) {
    this.paginaAtual = event;
    this.aoMudarDePagina(event);
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
  private buscarProjetos(pagina: number) {
    this.projetoService.buscarProjetos(pagina).subscribe(
      (result) => {
        this.Projetos = result
        this.paginaAtual = result.paginaAtual
        this.aguardandoDados = false
      },
      erro => {
        if (erro.status === 0) {
          this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
          console.log("Não foi possivel realizar a comunicação!")
        }

        if (erro.status === 404) {
          this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Nenhum projeto foi encontrado!', duration: 2500 })
          console.log("Nenhum projeto foi encontrado!")
        }
        if (erro.status === 500) {
          this.toast.error({ detail: " ❌ Erro", summary: 'O servidor não conseguiu carregar os projetos!', duration: 2500 })
          console.log("Houve um erro no servidor!")
        }
      },
      () => {
        this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
      }
    );
  }

  private atualizarPagina(id: string) {
    let param = parseInt(id);
    this.Projetos.data = this.Projetos.data.filter((p: Projeto) => p.id !== param)
    this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Projeto deletado com sucesso!', duration: 750 })
  }
  private aoMudarDePagina(pagina: number) {
    this.projetoService.buscarProjetos(pagina).subscribe(
      (result) => {
        this.Projetos = result
        this.paginaAtual = result.paginaAtual
        this.aguardandoDados = false
      },
      erro => {
        if (erro.status === 0) {
          console.log("Não foi possivel realizar a comunicação!")
          this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel carregar os Projetos!', duration: 950 })
        }

        if (erro.status === 404) {
          console.log("Nenhum projeto foi encontrado!")
          this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Nenhum projeto encontrado!', duration: 750 })
        }
        if (erro.status === 500) {
          this.toast.error({ detail: " ❌ Erro", summary: 'O servidor não conseguiu carregar os projetos!', duration: 1000 })
          console.log("Houve um erro no servidor!")
        }
      }
    );
  }
  /** Final metodos de chamadas ao serviço */

  /** Metodo executado quando o componente é destruido */
  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }
 /** Final metodo de destruição */
}
