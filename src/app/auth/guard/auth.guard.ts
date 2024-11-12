import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    const token = this.loginService.getToken();
    if (!token) {
      // Usuario no autenticado, redirige al login
      this.router.navigate(['/inicio']);
      return false;
    }

    const expectedRoles = route.data['roles'] as Array<string>;
    const userRoles = this.loginService.getUserRoles();

    // Verifica si el usuario tiene al menos uno de los roles esperados
    const hasRole = expectedRoles
      ? expectedRoles.some(role => userRoles.includes(role))
      : true; // Permitir acceso si no se especifican roles

    if (!hasRole) {
      // Usuario no autorizado, redirige a una página específica o al inicio
      this.router.navigate(['/inicio']);
      return false;
    }

    return true; // Usuario autenticado y con el rol adecuado, permite la navegación
  }
}
