import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit{
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    
  }
  redirecionar() {
    this.router.navigate(["/projetos"])
  }
}
