import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-remover-produto',
  templateUrl: './remover-produto.component.html',
  styleUrls: ['./remover-produto.component.scss']
})
export class RemoverProdutoComponent {
  nome: string = "";
  ProdutoId: string = '';
  constructor(public dialogRef: MatDialogRef<RemoverProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProdutosService,
    private toast: NgToastService,) { }

  ngOnInit(): void {
    this.nome = this.data.nome
    this.ProdutoId = this.data.id;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  deletarProduto(id: string) {
    this.projetosService.deletarProduto(id).subscribe(
      (result) => {
        console.log("Projeto removido")
      },
      error => {
        this.toast.error({ detail: "❌ Erro", summary: 'Não foi possivel realizar a remoção do produto!', duration: 5000 });
      }
    );
    this.projetosService.filterSub(id);
    this.fecharDialog();
  }

}