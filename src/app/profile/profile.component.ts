import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <body>
      <main>
          <div>
            <h1>Meu Perfil</h1>
            <button>
              <img 
                (click)="enableEdition()"
                src="editar.png" 
                alt="Editar"
              >
            </button>
          </div>
        <form>
          <section class="profile-input-section">
            <label for="nome">Nome</label>
            <input 
              type="text"
              name="nome"
              id="nome"
              formControlName="nome"
              value={{this.usuario.nome}}
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <label for="email">E-mail</label>
            <input 
              type="text"
              name="email"
              id="email"
              formControlName="email"
              value={{this.usuario.email}}
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <label for="endereco">Endereço</label>
            <input 
              type="text"
              name="endereco"
              id="endereco"
              formControlName="endereco"
              value={{this.usuario.endereco}}
              class="profile-input"
              [readonly]="isReadOnly"
            >
          </section>

          <button type="submit" *ngIf="isReadOnly == false">Salvar</button>
        </form>
      </main>
    </body>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isReadOnly: boolean = true;

  constructor (private route: ActivatedRoute){
    const userId = parseInt(this.route.snapshot.params['id']);
    console.log(userId);
  }
  
  usuario = {
    nome: "Caio Capêlo",
    email: "caiocapelo2@hotmail.com",
    endereco: "Avenida Mister Hull, 2992",
  }

  enableEdition() {
    this.isReadOnly = false;
  }


}
