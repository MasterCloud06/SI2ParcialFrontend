import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { LoginService } from 'src/app/services/login/login.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  isLoggedIn = false;
  userRoles: string[] = [];

  constructor(private sidebarService: SidebarService, private loginService: LoginService) {}

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

    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }

  // Método auxiliar para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
