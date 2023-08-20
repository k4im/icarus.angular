import { Component, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjetosService } from 'src/app/services/projetos.service';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-remover-projeto',
  templateUrl: './remover-projeto.component.html',
  styleUrls: ['./remover-projeto.component.scss'],
  providers: [NgToastService]
})
export class RemoverProjetoComponent {
  nome: string = "";
  ProjetoId: number = 0;
  constructor(public dialogRef: MatDialogRef<RemoverProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.nome = this.data.nome
    this.ProjetoId = this.data.id;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  deletarProjeto(id: number) {
    let param = id.toString();
    this.projetosService.remover(param).subscribe(
      (result) => {
        console.log("Projeto removido")
        this.toast.success({ detail: "✔️ Sucesso", summary: 'Produto removido com sucesso!', duration: 5000 });
      },
      error => {
        this.toast.error({ detail: "❌ Erro", summary: 'Não foi possivel realizar a remoção do projeto!', duration: 5000 });
      }
    );
    this.projetosService.filterSub(param);
    this.fecharDialog();
  }

}
