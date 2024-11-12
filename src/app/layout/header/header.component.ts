import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  userRoles: string[] = [];

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();

    // Obtener roles iniciales
    this.userRoles = this.loginService.getUserRoles();

    // Suscribirse a cambios en el estado de login
    this.loginService.userLoginOn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userRoles = this.loginService.getUserRoles();
      } else {
        this.userRoles = [];
      }
    });

    // Opcional: Suscribirse a cambios en los roles si pueden cambiar dinámicamente
    this.loginService.getUserRolesObservable().subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    // Utilizar el servicio de login para hacer el logout
    this.loginService.logout(); // Limpia los datos de autenticación
    this.isLoggedIn = false; // Actualiza el estado del componente (si es necesario)

    // Luego redirige al usuario a la página '/inicio'
    this.router.navigate(['/inicio']);
  }

  // Método auxiliar para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
