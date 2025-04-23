import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HeaderComponent, FooterComponent],
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
        <a [routerLink]="['/register']">Cadastro</a>
      </div>
    </nav>
    <body class="register-body">  
      <main class="register-main">
        <form [formGroup]="registerForm" (ngSubmit)="registerUsuario()" class="register-form">
          <img 
            src="logo.png" 
            alt="logo"
            class="register-logo"
          > 
          <h1 class="register-title">Crie sua conta</h1>
          <p class="register-description">
            Ainda não possui cadastro? Insira suas informações
            para que a gente possa lhe conhecer e comece sua jornada!
          </p>

          <div *ngIf="registerError" class="register-error">
            <p>{{ registerError }}</p>
          </div>

          <section class="register-input-section">
            <input 
              type="text" 
              name="nome" 
              id="nome" 
              placeholder="Nome Completo*" 
              formControlName="nome"
              class="register-input" 
              required
            >
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="E-mail*" 
              formControlName="email"
              class="register-input" 
              required
            >
            <input 
              type="password" 
              name="senha" 
              id="senha" 
              placeholder="Senha*" 
              formControlName="senha"
              class="register-input" 
              required
            >
            <input 
              type="password" 
              name="confirma_senha" 
              id="confirma_senha" 
              placeholder="Confirme a senha*" 
              formControlName="confirma_senha"
              class="register-input" 
              required
            >
          </section>

          <button type="submit" class="register-button">Cadastrar</button>

          <p class="register-login">Já possui cadastro? <a class="register-login-link" [routerLink]="['/auth']">Entre por aqui</a></p>
        </form>
      </main>
    </body>
    <app-footer></app-footer>
  `,
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerError: string = '';
  appService = inject(AppService);

  constructor (private router: Router) {}

  registerForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    confirma_senha: new FormControl(''),
  });

  async registerUsuario(){
    if(this.registerForm.value.senha != this.registerForm.value.confirma_senha){

      this.registerError = "As senhas não coincidem. Por favor, preencha novamente.";
      console.log(this.registerError);

    } else {
        const res = await this.appService.cadastrarUsuario(
          this.registerForm.value.nome ?? '',
          this.registerForm.value.email ?? '',
          this.registerForm.value.senha ?? '',
        );

        if(res){
          window.alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/auth']);
        } else {
          this.registerError = "Houve algum erro no cadastro. Por favor, tente novamente.";
        }
    }
  }
}
