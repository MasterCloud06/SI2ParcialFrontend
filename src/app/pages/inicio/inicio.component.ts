// inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

interface Servicio {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  servicios: Servicio[] = [
    {
      titulo: 'Consulta General',
      descripcion: 'Atención médica personalizada para tu bienestar.',
      imagen: 'assets/images/consulta-general.jpg'
    },
    // Agrega más servicios según sea necesario
  ];

  menuActivo: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    this.isLoggedIn = this.loginService.isLoggedIn();
    // Actualizar el estado de autenticación cuando cambie
    this.loginService.userLoginOn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleMenu(): void {
    this.menuActivo = !this.menuActivo;
  }
}
