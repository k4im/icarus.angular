import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit{
  
  statusDefault = "Status do projeto";
  produtoDefault = "Produto utilizado no projeto";
  Status: {status: string}[] = [{status: "Produção"}, {status: "Pendente"}, {status: "Atrasado"}, {status: "Cancelado"},]
  ProdutosEmEstoque: Produto[] = []
  aguardandoDados: boolean = true;
  selectProduto!: Produto;
  selectStatus: string = "";
  
  constructor(private router: Router, private projetoService: ProjetosService) {}
  
  ngOnInit(): void {
    this.buscarProdutos();
  }
  redirecionar() {
    this.router.navigate(["/projetos"])
  }
  
  buscarProdutos(){
    this.projetoService.buscarTodosProdutos().subscribe(
      (result) => {this.ProdutosEmEstoque = result
      this.aguardandoDados = false
    }
    )
  }

  produtoSelecionado(){
    console.log(this.selectProduto)
  }
  statusSelecionado(){
    console.log(this.selectStatus);
  }
}
