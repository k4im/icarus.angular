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
  
  /** Variaveis inicilizadas por dados partindo da abertura do modal  */
  nome!: string;
  stats!: string;
  valor!: string;
  entrega!: string;
  inicio!: string;
  ProjetoId: number = 0;
  formEdit!: FormGroup;
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  /** Final variaveis inicializadas partindo da abertura da modal */

  /**Construtor  */
  constructor(public dialogRef: MatDialogRef<EditarProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetosService: ProjetosService,
    private toast: NgToastService,
    private formBuilder : FormBuilder) { }
  /**Final construtor */
  
  /**Metodo de inicalização do objeto */
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
  /**Final metodo de inicalização do objeto */
  
  /** Fechamento de modal */
  fecharDialog() {
    this.dialogRef.close();
  }
  /** Final fechamento de modal */
  
  /** Metodo de atualização de projeto (NÃO FUNCIONAL AINDA) */
  atualizarProjeto(){
      let statusValue: string = this.statusGetter?.value;
      this.projetosService.novoStatus(statusValue, this.data.id).subscribe(
        (result) => {
          
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400){
            this.projetosService.filterSub("BadModel");
          }
        }
      )
    
  }
  /** Final metodo de atualização */

  /** Getters das forms */
  get statusGetter() {
    return this.formEdit.get('novoStatus');
  }
  /**Final Getters */
}
