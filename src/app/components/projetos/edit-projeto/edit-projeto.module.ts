import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjetoRoutingModule } from './edit-projeto-routing.module';
import { EditProjetoComponent } from './edit-projeto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { ProjetosService } from 'src/app/services/projetos.service';


@NgModule({
  declarations: [
    EditProjetoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EditProjetoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
  ],
  providers: [ProjetosService]
})
export class EditProjetoModule { }
