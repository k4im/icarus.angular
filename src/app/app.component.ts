import { Component } from '@angular/core';
import { AuthGuard } from './services/Guards/AuthGuard.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icarus-front';
  estaAutenticado!: boolean;

  constructor(private auth : AuthGuard){
    this.estaAutenticado = this.auth.estaLogado;
  }
}
