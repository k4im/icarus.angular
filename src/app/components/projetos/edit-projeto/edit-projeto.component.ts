import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjetoUnico } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-edit-projeto',
  templateUrl: './edit-projeto.component.html',
  styleUrls: ['./edit-projeto.component.scss']
})
export class EditProjetoComponent implements OnInit {

  /** Variaveis inicializadas */
  selectId!: any;
  Projeto: ProjetoUnico = {
    id: 0,
    dataEntrega: "",
    dataInicio: "",
    descricao: "",
    nome: "",
    produtoUtilizado: { id: 0, nome: "", quantidade: 0 },
    quantidadeUtilizado: 0,
    status: "",
    valor: 0
  };
  formProjeto!: FormGroup;
  stats!: string;
  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  /** Final variaveis */

  /**Inicializado construtor para injeção de depdenciais */
  constructor(
    private routerActive: ActivatedRoute,
    private route: Router,
    private toast: NgToastService,
    private projetoService: ProjetosService,
    private builder: FormBuilder) { }
  /** Final construtor de injeção de dependencias */

  /** Realizando chamada ao serviço ao inicializar o component */
  ngOnInit(): void {
    this.routerActive.params.subscribe(
      (params) => { this.selectId = params['id']; }
    );
    this.buscarProjeto(this.selectId);
    this.formProjeto = this.builder.group(
      { novoStatus: [null, [Validators.required]] }
    );
  }
  /** Finalizando chamada ao inicializar o component */

  /** Metodo privado para busca de projeto */
  private buscarProjeto(id: number) {
    this.projetoService.buscarProjeto(this.selectId).subscribe(
      (result) => {
        this.Projeto = result;
        this.stats = result.status;
      },
      (Error: HttpErrorResponse) => {
        this.validarResponse(Error);
      }
    );
  }
  /** Final de metodo privado */

  /**Metodos vinculados aos botões de cancelar e atualizar*/
  submitProjeto() {
    let status: string = this.statusGetter.value;
    this.validar(status);
    this.projetoService.novoStatus(status, this.selectId).subscribe(
      (result) => {
        this.stats = status;
        this.route.navigate(["/projetos"])
      },
      (Error: HttpErrorResponse) => {
        this.validarResponse(Error);
      },
      () =>  {
        this.toast.success({ detail: "Sucesso", summary: "Status do projeto atualizado com sucesso!", duration: 950 })
      }
    )

  }

  redirecionar() {
    this.route.navigate(["/projetos"])
  }
  /** Final metodos vinculados */


  /** Getter do campo de novo status */
  get statusGetter() {
    return this.formProjeto.get("novoStatus")!
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
      break;
    case 404:
      this.toast.warning({ detail: "⚠️ Não foi possivel estar localizando o projeto", summary: 'Servidor repsondeu com status: 404!', duration: 2500 })
      console.log("Nenhum projeto foi encontrado!")
      break;
    case 500:
      this.toast.error({ detail: "❌ Não foi possivel atualizar o projeto, pois ocorreu um erro no servidor", summary: 'Servidor respondeu com status: 500!', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    case 400:
      this.toast.error({ detail: "❌ Não foi possivel atualizar o projeto, pois o modelo é invalido", summary: 'Servidor respondeu com status: 400!', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    case 409:
      this.toast.error({ detail: "❌ Não foi possivel estar atualizando o projeto!", summary: 'Servidor respondeu com status: 409', duration: 2500 })
      console.log("Houve um erro no servidor!")
      break
    default:
      this.toast.error({ detail: " ❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
      console.log("Não foi possivel realizar a comunicação!")
      break;
  }
}
/** Final http response */
}
