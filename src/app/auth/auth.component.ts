import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <nav id="breadcrumbs">
      <div>
        <a [routerLink]="['/']">
          <img 
            src="general/home.png" 
            alt=""
          >
        </a>
        <p>></p>
        <a [routerLink]="['/auth']">Login</a>
      </div>
    </nav>
    <body class="auth-body">
      <main class="auth-main">
        <form [formGroup]="authForm" (ngSubmit)="signInUsuario()" class="auth-form">
          <img 
            src="logo.png" 
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
            <a href="">Esqueceu sua senha?</a>
          </section>

          <button type="submit" class="auth-button">Entrar</button>

          <p class="auth-register">
            Não possui cadastro? 
            <a [routerLink]="['/register']" class="auth-register-link">Cadastre-se aqui</a>
          </p>
        </form>
      </main>
    </body>
    <app-footer></app-footer>
  `,
  styleUrls: ['./auth.component.css']
})


export class AuthComponent {
  authError: string = '';
  appService = inject(AppService);

  constructor(private router: Router, private authService: AuthService) { }

  authForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  async signInUsuario(){
    try {
      const usuario = await this.appService.autenticarUsuario(
        this.authForm.value.email ?? '',
        this.authForm.value.senha ?? '',
      );

      if (usuario?.id) {
        this.authService.setUser(usuario);

        if(!usuario.administrador){
          this.router.navigate(['']);
        } else {
          this.router.navigate(['admin']);
        }
      } else {
        this.authError = 'Credenciais inválidas';
      }
      
    } catch (error) {
      this.authError = 'Erro ao autenticar. Tente novamente mais tarde.';
      console.error(error);
    }
  }
}
