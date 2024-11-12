import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';  // Asegúrate de tener un servicio de autenticación

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      // Si el usuario no está autenticado, redirigir al login
      this.router.navigate(['/login']);
    }
  }

}
