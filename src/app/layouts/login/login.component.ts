import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { IAuthLogin, IToken } from 'src/app/Interfaces/IAuth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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
    private route: Router){}
  
  
  ngAfterContentInit(): void {
  let item = this.helperLocalStorage("lembrarLogin");
  if(!item){
    this.AuthService.realizarLoginAutomatico(item!).subscribe(
      (result) => {
        this.route.navigate(["/dashboard"])
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
          this.route.navigate(["/dashboard"])
        },
        (error: HttpErrorResponse) => {
          console.log("Deu erro: " + error.status)
        },
      )
    }
    else {
      this.AuthService.realizarLogin(loginObj).subscribe(
        (result) => {
          this.route.navigate(["/dashboard"])
        },
        (error: HttpErrorResponse) => {
          console.log("Deu erro: " + error.status)
        },
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
}
