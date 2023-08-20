import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-editar-projeto',
  templateUrl: './editar-projeto.component.html',
  styleUrls: ['./editar-projeto.component.scss']
})
export class EditarProjetoComponent {
  nome!: string;
  stats!: string;
  valor!: string;
  entrega!: string;
  inicio!: string;
  ProjetoId: number = 0;
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  constructor(public dialogRef: MatDialogRef<EditarProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.nome = this.data.nome;
    this.stats = this.data.status
    this.valor = this.data.valor;
    this.entrega = this.data.entrega
    this.inicio = this.data.inicio;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  deletarProjeto(id: number) {
    let param = id.toString();
    this.projetosService.buscarProjeto(param).subscribe(
      (result) => {
      },
      error => {
        this.toast.error({ detail: "❌ Erro", summary: 'Não foi possivel realizar a remoção do projeto!', duration: 5000 });
      }
    );
    this.projetosService.filterSub(param);
    this.fecharDialog();
  }

}
