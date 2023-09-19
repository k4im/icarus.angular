import { HttpErrorResponse } from '@angular/common/http';
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
    let param = id.toString();
    this.projetosService.deletarProduto(id).subscribe(
      (result) => {
        console.log("produto removido")
      },
      (error: HttpErrorResponse) => {
        this.validarResponse(error);
      }
    );
    this.projetosService.filterSub(param);
    this.fecharDialog();
  }

    /**
   * 
   * @param error recebe valor HttpErroResponse vindo das APIs utilizadas 
   * verificado o retorno http response, é disparado uma notificação referente a resposta recebida.
   */
    private validarResponse(error: HttpErrorResponse) {
      switch (error.status) {
        case 0:
          this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
          console.log("Não foi possivel realizar a comunicação!")
          break;
        case 200:
          this.toast.warning({ detail: "⚠️ Aviso", summary: 'Produto deletado com sucesso!', duration: 2500 })
          break;
        case 404:
          this.toast.warning({ detail: "⚠️ Aviso", summary: 'Nenhum projeto foi encontrado!', duration: 2500 })
          console.log("Nenhum projeto foi encontrado!")
          break;
        case 500:
          this.toast.error({ detail: "❌ Erro", summary: 'O servidor não conseguiu carregar os projetos!', duration: 2500 })
          console.log("Houve um erro no servidor!")
          break
        default:
          this.toast.error({ detail: "❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
          console.log("Não foi possivel realizar a comunicação!")
          break;
      }
    }
    /** Final http response */
  }
