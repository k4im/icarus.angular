import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentInit {
  formGroupLogin!: FormGroup
  lembrarLogin: boolean = false;
  
  constructor(
    private builder: FormBuilder,
    private AuthService : AuthService,
    private route: Router,
    private toast: NgToastService){}
  
  
  ngAfterContentInit(): void {
  let item = this.helperLocalStorage("lembrarLogin");
  if(!item){
    this.AuthService.realizarLoginAutomatico(item!).subscribe(
      (result) => {
        this.route.navigate(["/"])
      }
    );}
  }
  
  ngOnInit(): void {
    this.formGroupLogin = this.builder.group({
      chave: [null, Validators.required],
      password: [null, Validators.required]
    })    
  }

  
  logar() {
    let loginObj: IAuthLogin = {chaveDeAcesso: this.chaveGetter.value, senha: this.pwdGetter.value};
  
    if(this.lembrarLogin) {
      this.AuthService.salvarLogin(loginObj).subscribe(
        (result) => {
          console.log("Realizado login!")
        },
        (error: HttpErrorResponse) => {
          this.validarResponse(error)
        },
        () => {
          this.toast.success({ detail: "✔️ Sucesso", summary: 'Login efetuado com sucesso!', duration: 750 })
          this.route.navigate(["/"])
        }
      )
    }
    else {
      this.AuthService.realizarLogin(loginObj).subscribe(
        (result) => {
          console.log("Realizado login!")
        },
        (error: HttpErrorResponse) => {
          this.validarResponse(error)
        },
        () => {
          this.toast.success({ detail: "✔️ Sucesso", summary: 'Login efetuado com sucesso!', duration: 750 })
          this.route.navigate(["/"])
        }
      )
    }
    
  }
  
  /**
   * Getters para buscar valores dos campos do formulario de login
   */
  get chaveGetter() {
    return this.formGroupLogin.get('chave')!
  }

  get pwdGetter() {
    return this.formGroupLogin.get('password')!
  }

  /**
   * 
   * @param chave recebe valor to tipo string, onde o mesmo
   * sera utilizado para realizar a busca através do localstorage e verificar se
   * os dados armazenados no mesmo se encontram expirados.
   * @returns void
   */
  helperLocalStorage(chave: string) {
    const itemStr = localStorage.getItem(chave);
    if(!itemStr)
      return null
    const item: {
      chave: string, 
      pwd: string,
      expiry: number} = JSON.parse(itemStr)
    const agora = new Date();
    if(agora.getTime() >= item.expiry) {
      localStorage.removeItem(chave);
      return null
    }
    return item
  }

  /**
   * 
   * @param error recebe valor HttpErroResponse vindo das APIs utilizadas 
   * verificado o retorno http response, é disparado uma notificação referente a resposta recebida.
   */
  private validarResponse(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.toast.error({ detail: "❌ Erro", summary: 'Não foi possivel se comunicar com o servidor!', duration: 2500 })
        console.log("Não foi possivel realizar a comunicação!")
        break;
      case 404:
        this.toast.error({ detail: "❌ Erro", summary: 'Senha ou usuario invalidos!', duration: 2500 })
        console.log("Nenhum projeto foi encontrado!")
        break;
      case 404:
        this.toast.warning({ detail: " ⚠️ Aviso", summary: 'Senha ou usuarios invalidos!', duration: 2500 })
        console.log("Nenhum projeto foi encontrado!")
        break;
      case 500:
        this.toast.error({ detail: " ❌ Erro", summary: 'O servidor não conseguiu processar sua requisição!', duration: 2500 })
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
