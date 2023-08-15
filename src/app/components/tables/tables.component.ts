import { Component, OnInit } from '@angular/core';

export interface Projeto {
  Name: string;
  DataInicio: string
  DataEntrega: string;
  Status: string;
  Valor: number;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {
  Projetos: Projeto[] = [];
  objetoProducao: Projeto = { Name: "teste", DataInicio: new Date().toLocaleDateString('en-GB'), DataEntrega: new Date().toLocaleDateString('en-GB'), Status: "Produção", Valor: 1550.00 };
  objetoPendente: Projeto = { Name: "teste", DataInicio: new Date().toLocaleDateString('en-GB'), DataEntrega: new Date().toLocaleDateString('en-GB'), Status: "Pendente", Valor: 1550.00 };
  objetoAtrasado: Projeto = { Name: "teste", DataInicio: new Date().toLocaleDateString('en-GB'), DataEntrega: new Date().toLocaleDateString('en-GB'), Status: "Atrasado", Valor: 1550.00 };
  totalDepaginas: number = 5
  totalPaginas: number[] = [1, 2, 3, 4];
  paginaAtual: number = 1;
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 3; index++) {
      this.Projetos.push(this.objetoProducao);
      this.Projetos.push(this.objetoAtrasado);
      this.Projetos.push(this.objetoPendente);
    }
  }

  getStatus(status: string): string {
    if (status === "Produção") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (status === "Pendente") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  onTableDataChange(event: any) {
    this.paginaAtual = event;
  }

}
