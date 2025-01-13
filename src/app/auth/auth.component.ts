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
    <body>
      <main>
        <form [formGroup]="authForm" (ngSubmit)="loginUsuario()">
          <!-- Logo -->
          <img 
            src="" 
            alt="logo"
          > 
          <h1>Entre na sua conta</h1>
          <p>
            Nela você consegue ver suas compras anteriores
            e adquirir novos cards para sua coleção!
          </p>
          <div *ngIf="authError">
            <p>{{ authError }}</p>
          </div>
          <section>
              <input 
                type="email" name="email" id="email" placeholder="E-mail"
                formControlName="email" required
              >
              <!-- Implementar visibilidade da senha -->
              <input 
                type="password" name="senha" id="senha" placeholder="Senha"
                formControlName="senha" required
              >
            <p>Esqueceu sua senha?</p>
            <button type="submit">Entrar</button>
          </section>
          <p>Não possui cadastro? <a [routerLink]="['/register']">Cadastre-se aqui</a></p>
        </form>
      </main>
    </body>
  `,
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  authError: string = '';
  appService = inject(AppService);
  
  constructor(private router: Router){}

  authForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  async loginUsuario(){
    try {
      const usuario = await this.appService.autenticarUsuario(
        this.authForm.value.email ?? '',
        this.authForm.value.senha ?? '',
      );
    
      if(usuario?.id) {
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
