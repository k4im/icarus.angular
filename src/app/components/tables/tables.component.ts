import { Component, OnInit} from '@angular/core';

export interface Projeto {
  Name: string;
  DataInicio: number
  DataEntrega: number;
  Status: string;
  Valor: any;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {
  Projetos: Projeto[] = [];
  objetoProducao: Projeto = {Name: "teste", DataInicio: new Date().getDate(), DataEntrega: new Date().getDate(), Status: "Produção", Valor: 1550.00};
  objetoPendente: Projeto = {Name: "teste", DataInicio: new Date().getDate(), DataEntrega: new Date().getDate(), Status: "Pendente", Valor: 1550.00};
  objetoAtrasado: Projeto = {Name: "teste", DataInicio: new Date().getDate(), DataEntrega: new Date().getDate(), Status: "Atrasado", Valor: 1550.00};

  constructor() {}
  
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

}
