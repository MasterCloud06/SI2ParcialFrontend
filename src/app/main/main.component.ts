import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isSidebarVisible = true;
  showHeaderAndSidenav = true;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los eventos de visibilidad del sidebar
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });

    // Suscribirse a los eventos de navegación para controlar la visibilidad de header y sidenav
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        const navEvent = event as NavigationEnd; // Cast explícito a NavigationEnd
        // Define las rutas donde el header y sidenav deben ocultarse
        const hiddenRoutes = ['/inicio', '/login'];
        this.showHeaderAndSidenav = !hiddenRoutes.includes(navEvent.urlAfterRedirects);
      });
  }
}
