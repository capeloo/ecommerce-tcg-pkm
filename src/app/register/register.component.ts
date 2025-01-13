import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  template: `
    <body>
      <main>
        <form action="">
          <!-- Logo -->
          <img 
            src="" 
            alt="logo"
          > 
          <h1>Crie sua conta</h1>
          <p>
            Ainda não possui cadastro? Insira suas informações
            para que a gente possa lhe conhecer e comece sua jornada!
          </p>
          <section>
            <input type="text" name="nome" id="nome" placeholder="Nome Completo*" required>
            <input type="email" name="email" id="email" placeholder="E-mail*" required>
            <input type="password" name="senha" id="senha" placeholder="Senha*" required>
            <input type="password" name="confirma_senha" id="confirma_senha" placeholder="Confirme a senha*" required>

            <button type="submit">Cadastrar</button>
          </section>
          <p>Já possui cadastro? <a [routerLink]="['/']">Entre por aqui</a></p>
        </form>
      </main>
    </body>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
