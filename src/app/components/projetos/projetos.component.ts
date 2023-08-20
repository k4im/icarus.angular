import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projeto, Projetos } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { timeout } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EditarProjetoComponent } from './editar-projeto/editar-projeto.component';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {

  paginaAtual: number = 1;
  Projetos: Projetos = { data: [], paginaAtual: 0, totalDePaginas: 0, totalItens: 0 };
  aguardandoDados: boolean = true;

  constructor(public dialog: MatDialog, private projetoService: ProjetosService, private toast: NgToastService) {
    this.projetoService.listen().subscribe((m: any) => {
      console.log("Removido projeto: " + m);
      this.atualizarPagina(m);
    })
  }

  ngOnInit(): void {
    this.buscarProjetos(this.paginaAtual);
  }

  validarStatus(projeto: Projeto): string {
    if (projeto.status === "Produção") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (projeto.status === "Pendente") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  mudarDePagina(event: any) {
    this.paginaAtual = event;
    this.aoMudarDePagina(event);
  }

  abrirDialogDelete(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(RemoverProjetoComponent, {
      data: { id: eventoClick.id, nome: eventoClick.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  abrirDialogEdit(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(EditarProjetoComponent, {
      data: {
        id: eventoClick.id,
        nome: eventoClick.nome,
        status: eventoClick.status,
        inicio: eventoClick.dataInicio,
        entrega: eventoClick.dataEntrega,
        valor: eventoClick.valor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  private buscarProjetos(pagina: number) {
    this.projetoService.buscarProjetos(pagina).subscribe(
      (result) => {
        this.Projetos = result
        this.paginaAtual = result.paginaAtual
        this.aguardandoDados = false
        this.toast.success({ detail: "✔️ Sucesso", summary: 'Projetos carregados com sucesso!', duration: 750 })
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
}
