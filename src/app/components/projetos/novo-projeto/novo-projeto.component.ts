import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { Produto } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {

  dataInicio!: Date;
  dataEntrega!: any;
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]

  ProdutosEmEstoque: Produto[] = []
  aguardandoDados: boolean = true;
  selectProduto!: Produto;
  selectStatus: string = "";

  constructor(private router: Router, private projetoService: ProjetosService, private pipe: DatePipe) { }
  print() {
    let valor = this.pipe.transform(this.dataInicio, 'yyyy-MM-ddThh:mm:ss.SSS')
    console.log('data inicio: ' + valor);
    console.log('data entrega: ' + new Date(this.dataEntrega));
  }
  ngOnInit(): void {
    this.buscarProdutos();
  }
  redirecionar() {
    this.router.navigate(["/projetos"])
  }

  buscarProdutos() {
    this.projetoService.buscarTodosProdutos().subscribe(
      (result) => {
        this.ProdutosEmEstoque = result
        this.aguardandoDados = false

      },
      erro => {
        if (erro.status === 0) {
          console.log("Não foi possivel realizar a comunicação!")
        }

        if (erro.status === 400) {
          console.log("O dado enviado é invalido!")
        }
        if (erro.status === 404) {
          console.log("Nenhum projeto foi encontrado!")
        }
        if (erro.status === 500) {
          console.log("Houve um erro no servidor!")
        }
      }

    )
  }

  produtoSelecionado() {
    console.log(this.selectProduto)
  }
  statusSelecionado() {
    console.log(this.selectStatus);
  }
}
