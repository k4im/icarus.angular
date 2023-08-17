import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ModalsComponent } from './components/modals/modals.component';
import { ProjetosService } from './services/projetos.service';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ModalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [ProjetosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
