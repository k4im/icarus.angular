import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  formGroupLogin!: FormGroup
  loginObj!: IAuthLogin;
  constructor(
    private builder: FormBuilder,
    private AuthService : AuthService,
    private route: Router){}
  
  ngOnInit(): void {
    this.formGroupLogin = this.builder.group({
      chave: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  logar() {
    this.loginObj = { chaveDeAcesso: this.chaveGetter.value, senha: this.pwdGetter.value}
    this.AuthService.realizarLogin(this.loginObj).subscribe(
      (result) => {
        this.route.navigate(["/dashboard"])
      },
      (error: HttpErrorResponse) => {
        console.log("Deu erro: " + error.status)
      },
    )
  }

  get chaveGetter() {
    return this.formGroupLogin.get('chave')!
  }

  get pwdGetter() {
    return this.formGroupLogin.get('password')!
  }
}
