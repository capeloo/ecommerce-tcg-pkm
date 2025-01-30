import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
<<<<<<< Updated upstream
    <body class="auth-body">
      <main class="auth-main">
        <form [formGroup]="authForm" (ngSubmit)="loginUsuario()" class="auth-form">
=======
    <body>
      <main>
        <form [formGroup]="authForm" (ngSubmit)="signInUsuario()">
          <!-- Logo -->
>>>>>>> Stashed changes
          <img 
            src="" 
            alt="logo"
            class="auth-logo"
          > 
          <h1 class="auth-title">Faça login na Loja</h1>
          <p class="auth-description">
            Acesse sua conta para ver suas compras anteriores
            ou adquirir novos cards para sua coleção!
          </p>

          <div *ngIf="authError" class="auth-error">
            <p>{{ authError }}</p>
          </div>

          <section class="auth-input-section">
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="E-mail*" 
              formControlName="email" 
              class="auth-input" 
              required
            >
            <input 
              type="password" 
              name="senha" 
              id="senha" 
              placeholder="Senha*" 
              formControlName="senha" 
              class="auth-input" 
              required
            >
          </section>

          <button type="submit" class="auth-button">Entrar</button>

          <p class="auth-register">
            Não possui cadastro? 
            <a [routerLink]="['/register']" class="auth-register-link">Cadastre-se aqui</a>
          </p>
        </form>
      </main>
    </body>
  `,
  styleUrls: ['./auth.component.css']
})


export class AuthComponent {
  authError: string = '';
  appService = inject(AppService);

  constructor(private router: Router) { }

  authForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

<<<<<<< Updated upstream
  async loginUsuario() {
=======
  async signInUsuario(){
>>>>>>> Stashed changes
    try {
      const usuario = await this.appService.autenticarUsuario(
        this.authForm.value.email ?? '',
        this.authForm.value.senha ?? '',
      );

      if (usuario?.id) {
        this.router.navigate(['home']);

      } else {
        this.authError = 'Credenciais inválidas';
      }
    } catch (error) {
      this.authError = 'Erro ao autenticar. Tente novamente mais tarde.';
      console.error(error);
    }
  }
}
