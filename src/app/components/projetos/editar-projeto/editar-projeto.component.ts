import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formEdit!: FormGroup;
  
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  constructor(public dialogRef: MatDialogRef<EditarProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService,
    private toast: NgToastService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.nome = this.data.nome;
    this.stats = this.data.status
    this.valor = this.data.valor;
    this.entrega = this.data.entrega
    this.inicio = this.data.inicio;

    this.formEdit = this.formBuilder.group({
      novoStatus: [null, [Validators.required]]
    })
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  atualizarProjeto(){
      console.log("Status é: " + this.statusGetter?.value)
      this.projetosService.novoStatus(this.statusGetter?.value, this.data.id).subscribe(
        (result) => {
          console.log(result)
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500){
            console.log("Erro 500")
          }
        }
      )
    
  }

  get statusGetter() {
    return this.formEdit.get('novoStatus');
  }

}
