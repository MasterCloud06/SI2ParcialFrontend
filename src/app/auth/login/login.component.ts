import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { LoginRequest } from '../../services/login/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: string = ""; // Mensaje de error para mostrar en la UI

  // Definición del formulario
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]], // Campo para el nombre de usuario
    password: ['', [Validators.required]], // Campo para la contraseña
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Suscripción para redirigir al usuario a la página de login si no está autenticado
    this.loginService.userLoginOn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  // Getter para el campo de nombre de usuario
  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  // Método de inicio de sesión
  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      const loginData: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };

      this.loginService.login(loginData).subscribe({
        next: (response) => {
          console.log('Usuario autenticado con token:', response);
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        },
        error: (error) => {
          console.error('Error en el login:', error);
          this.loginError = this.getErrorMessage(error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Por favor, revise los campos e ingrese los datos correctamente.");
    }
  }

  // Método de cierre de sesión
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  // Método para obtener mensajes de error específicos
  private getErrorMessage(error: any): string {
    if (error.status === 401) {
      return "Credenciales incorrectas. Por favor intente nuevamente.";
    } else if (error.status === 404) {
      return "Usuario no encontrado. Por favor verifique el nombre de usuario.";
    } else {
      return "Ha ocurrido un error inesperado. Inténtelo más tarde.";
    }
  }
}
