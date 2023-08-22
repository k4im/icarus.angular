import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Projeto, ProjetoUnico } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-edit-projeto',
  templateUrl: './edit-projeto.component.html',
  styleUrls: ['./edit-projeto.component.scss']
})
export class EditProjetoComponent  implements OnInit{

  /** Variaveis inicializadas */
  selectId! : any;
  Projeto!: ProjetoUnico;
  formProjeto!: FormGroup;
  stats!: string;
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  /** Final variaveis */
  
  /**Inicializado construtor para injeção de depdenciais */
  constructor(
    private routerActive : ActivatedRoute,
    private route: Router,
    private toast: NgToastService,
    private projetoService: ProjetosService,
    private builder: FormBuilder) {}
  /** Final construtor de injeção de dependencias */

  /** Realizando chamada ao serviço ao inicializar o component */
  ngOnInit(): void {
    this.selectId = this.routerActive.snapshot.params['id'];
    this.buscarProjeto(this.selectId);
    this.formProjeto = this.builder.group(
      {novoStatus: [null, [Validators.required]]}
    );
  }
    /** Finalizando chamada ao inicializar o component */

  /** Metodo privado para busca de projeto */
  private buscarProjeto(id: number){
    this.projetoService.buscarProjeto(this.selectId).subscribe(
      (result) => {
        this.Projeto = result;
        this.stats = result.status;
      },
      (Error: HttpErrorResponse) => {
        switch (Error.status) {
          case 404:
            this.toast.error({ detail: " ❌ Erro", summary: 'Nenhum projeto foi encontrado!', duration: 950 })
            break;
          case 500:
            this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel conseguir uma resposta do servidor!', duration: 950 })
            break;
          case 400:
            this.toast.error({ detail: " ❌ Erro", summary: 'O valor enviado não supre os valores necessários!', duration: 950 })
            break;
          default:
            this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel carregar os Projetos!', duration: 950 })
            break;
        }
      }
    );
  }
  /** Final de metodo privado */

  /**Metodos vinculados aos botões de cancelar e atualizar*/
  submitProjeto(){
    let status: string = this.statusGetter?.value;
    this.validar(status);
    this.projetoService.novoStatus(status, this.selectId).subscribe(
      (result) => {
        this.toast.success({detail: "Sucesso", summary: "Status do projeto atualizado com sucesso!", duration: 950})
        this.stats = status;
        this.route.navigate(["/projetos"])
      },
      (Error: HttpErrorResponse) => {
        switch (Error.status) {
          case 404:
            this.toast.error({ detail: " ❌ Erro", summary: 'Nenhum projeto foi encontrado!', duration: 950 })
            break;
          case 500:
            this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel conseguir uma resposta do servidor!', duration: 950 })
            break;
          case 400:
            this.toast.error({ detail: " ❌ Erro", summary: 'O valor enviado não supre os valores necessários!', duration: 950 })
            break;
          default:
            this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel atualizar o status!', duration: 950 })
            break;
        }
      }
    )

  }
  
  redirecionar(){
      this.route.navigate(["/projetos"])
  }
  /** Final metodos vinculados */


  /** Getter do campo de novo status */
  get statusGetter() {
    return this.formProjeto.get("novoStatus")
  }
  /** Final getter de novo status */
  
  /** Validar status projeto */
  validar(status: string) {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Produção":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelado": 
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Atrasado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }
  /** Final validar status */
  
}
