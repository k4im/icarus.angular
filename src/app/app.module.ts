import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedCommonModule } from './commons/sharedCommon.module';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { ProjetosService } from './services/projetos.service';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { AuthService } from './services/Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Interceptor } from './interceptors/request.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule,
    SharedCommonModule,
    Interceptor
  ],
  providers: [ProjetosService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
