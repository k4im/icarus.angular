import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [AuthService],
  exports: [CommonModule, NavigationComponent]
})
export class SharedModule { }
