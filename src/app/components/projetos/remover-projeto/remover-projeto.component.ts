import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjetosService } from 'src/app/services/projetos.service';


@Component({
  selector: 'app-remover-projeto',
  templateUrl: './remover-projeto.component.html',
  styleUrls: ['./remover-projeto.component.scss']
})
export class RemoverProjetoComponent {
  nome: string = "";
  ProjetoId: number = 0;
  constructor(public dialogRef: MatDialogRef<RemoverProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService) { }

  ngOnInit(): void {
    this.nome = this.data.nome
    this.ProjetoId = this.data.id;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  removerProjeto(id: number) {
    let param: string = id.toString();
    this.projetosService.remover(param).subscribe();
    this.dialogRef.close();
  }

}
