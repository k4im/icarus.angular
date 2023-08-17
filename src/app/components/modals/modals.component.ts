import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjetosService } from 'src/app/services/projetos.service';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent {
  nome: string = "";
  ProjetoId: number = 0;
  constructor(public dialogRef: MatDialogRef<ModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService) { }

  ngOnInit(): void {
    this.nome = this.data.nome
    this.ProjetoId = this.data.id;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  removerProjeto() {
    this.projetosService.remover(this.ProjetoId);
  }

}
