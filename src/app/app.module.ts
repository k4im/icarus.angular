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
import { NgToastModule } from 'ng-angular-popup' // to be added


import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjetosService } from './services/projetos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/Guards/AuthGuard.guard';
import { NotFoundComponent } from './layouts/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
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
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    NgxPaginationModule
  ],
  providers: [ProjetosService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
