import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  constructor(private router: Router) { }

  redirecionar() {
    this.router.navigate(["/projetos"])
  }
}
