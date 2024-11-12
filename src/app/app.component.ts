import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from './services/login/login.service';
import { SidebarService } from './services/sidebar/sidebar.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LMS';
  isLoggedIn = false;
  showHeaderAndSidenav = false;
  isSidebarVisible = true;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Obtener el estado inicial de autenticación
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.showHeaderAndSidenav = this.isLoggedIn;

    // Suscribirse al cambio de estado de autenticación
    this.loginService.userLoginOn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.updateHeaderAndSidenavVisibility(this.router.url);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });

    // Suscribirse al estado de visibilidad del sidebar
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });

    // Detectar cambios en las rutas
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateHeaderAndSidenavVisibility(event.urlAfterRedirects);
      });
  }

  updateHeaderAndSidenavVisibility(url: string) {
    this.showHeaderAndSidenav = this.isLoggedIn && url !== '/inicio';
    console.log("isLoggedIn:", this.isLoggedIn);
    console.log("showHeaderAndSidenav:", this.showHeaderAndSidenav);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/inicio');
  }
}
