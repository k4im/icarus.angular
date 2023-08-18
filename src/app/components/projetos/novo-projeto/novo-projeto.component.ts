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
  ProdutosEmEstoque: Produto[] = []
  aguardandoDados: boolean = true;
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
}
