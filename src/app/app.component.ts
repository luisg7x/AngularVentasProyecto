import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiAuthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario;

  constructor(public apiAuthService: ApiAuthService, private router: Router){
    this.apiAuthService.usuario.subscribe(res => {
      this.usuario = res;
      console.log('cambio el objeto ' + res);
    });
  }

  logout(){
    this.apiAuthService.logout();
    this.router.navigate(['/login']);
  }
}
