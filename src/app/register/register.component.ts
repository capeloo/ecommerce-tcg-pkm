import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  template: `
    <body class="register-body">
      <main class="register-main">
        <form action="" class="register-form">
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

          <section class="register-input-section">
            <input 
              type="text" 
              name="nome" 
              id="nome" 
              placeholder="Nome Completo*" 
              class="register-input" 
              required
            >
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="E-mail*" 
              class="register-input" 
              required
            >
            <input 
              type="password" 
              name="senha" 
              id="senha" 
              placeholder="Senha*" 
              class="register-input" 
              required
            >
            <input 
              type="password" 
              name="confirma_senha" 
              id="confirma_senha" 
              placeholder="Confirme a senha*" 
              class="register-input" 
              required
            >
          </section>

          <button type="submit" class="register-button">Cadastrar</button>

          <p>Já possui cadastro? <a [routerLink]="['/auth']">Entre por aqui</a></p>
        </form>
      </main>
    </body>
  `,
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

}
