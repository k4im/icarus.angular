import { Component } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icarus-front';
  estaAutenticado!: boolean;

  constructor(private auth : AuthService){
    this.estaAutenticado = this.auth.verificarTeste();
  }
}
