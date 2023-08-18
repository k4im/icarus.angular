import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent {
  
  constructor(private router: Router) {}
  
  redirecionar() {
    this.router.navigate(["/projetos"])
  }
}
