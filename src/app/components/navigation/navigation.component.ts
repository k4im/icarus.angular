import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  @Input()
  usuarioLogado: boolean = false;

  constructor(private authService: AuthService){}

  logOut() {
    this.authService.logout();
  }
}
