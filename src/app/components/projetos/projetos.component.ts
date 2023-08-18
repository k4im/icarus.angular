import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Projeto, Projetos } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { RemoverProjetoComponent } from './remover-projeto/remover-projeto.component';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {

  paginaAtual: number = 1;
  Projetos: Projetos = { data: [], paginaAtual: 0, totalDePaginas: 0, totalItens: 0 };
  aguardandoDados : boolean = true;

  constructor(public dialog: MatDialog, private projetoService: ProjetosService) {
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
    this.buscarProjetos(event);
  }

  abrirDialog(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(RemoverProjetoComponent, {
      data: { id: eventoClick.id, nome: eventoClick.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  buscarProjetos(pagina: number) {
    this.projetoService.buscarProjetos(pagina).subscribe(
      (result) => { this.Projetos = result 
      this.aguardandoDados = false
    }
    );
  }

  atualizarPagina(id: string) {
    let param = parseInt(id);
    this.Projetos.data = this.Projetos.data.filter((p: Projeto) => p.id !== param)
  }
}
