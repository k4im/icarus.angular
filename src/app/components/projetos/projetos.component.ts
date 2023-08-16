import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalsComponent } from '../modals/modals.component';
import { Projeto, Projetos } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
  providers: [ProjetosService]
})
export class ProjetosComponent {
  
  paginaAtual: number = 1;
  Projetos: Projetos = {data: [], paginaAtual: 0, totalDePaginas: 0};
  constructor(public dialog: MatDialog, private projetoService : ProjetosService) { }
  
  ngOnInit(): void {
    this.buscarProjetos(this.paginaAtual);
  }

  getStatus(projeto: Projeto): string {
    if (projeto.status === "Produção") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (projeto.status === "Pendente") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  mudarDePagina(event: any) {
    this.paginaAtual = event;
    this.buscarProjetos(event);
  }

  openDialog(eventoClick: Projeto): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      data: { id: 1, nome: eventoClick.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  buscarProjetos(pagina: number) {
    this.projetoService.buscarProjetos(pagina).subscribe(
      (result) => {this.Projetos = result}
    );
  }

  gerarArray(iterator: any){
    return new Array(iterator);
  }
}
