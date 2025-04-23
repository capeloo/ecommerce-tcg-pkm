import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../services/app.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <body>
      <main>
        <div>
          <a (click)="goBackToHome()">
            <img 
              src="logo.png" 
              alt="Logo"
              id="logo"
            > 
          </a>
          
          <h1>Meu Perfil</h1>
          <button>
            <img 
              (click)="enableEdition()"
              src="editar.png" 
              alt="Editar"
            >
          </button>
        </div>

        <div *ngIf="profileError" class="register-error">
          <p>{{ profileError }}</p>
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="saveEdition()">
          <section class="profile-input-section">
            <input 
              type="text"
              name="id"
              id="id"
              formControlName="id"
              class="profile-input"
              hidden
            >

            <label for="nome">Nome</label>
            <input 
              type="text"
              name="nome"
              id="nome"
              formControlName="nome"
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <label for="email">E-mail</label>
            <input 
              type="text"
              name="email"
              id="email"
              formControlName="email"
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <label for="endereco">Endereço</label>
            <input 
              type="text"
              name="endereco"
              id="endereco"
              formControlName="endereco"
              class="profile-input"
              [readonly]="isReadOnly"
            >
          </section>

          <button type="submit" *ngIf="isReadOnly == false">Salvar</button>
        </form>

        <a (click)="deleteAccount()">Remover conta</a>

      </main>
    </body>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  usuario: Usuario | null = null;
  profileError: string = '';
  isReadOnly: boolean = true;
  appService = inject(AppService);

  constructor (private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.consultarUsuario();
  }

  goBackToHome() {
    this.router.navigate([''], { queryParams: { id: this.usuario?.id } });
  }

  async consultarUsuario(){
    try {
      const usuario = await this.appService.consultarUsuarioPorId(this.route.snapshot.params['id']);

      if(usuario?.id){
        this.usuario = usuario;

        this.profileForm.patchValue({
          id: usuario.id.toString(),
          nome: usuario.nome,
          email: usuario.email,
          endereco: usuario.endereco
        });
      } else {
        window.alert('Houve um erro na consulta. Por favor, tente novamente');
        this.router.navigate(['/']);
      }

    } catch (error) {
      console.log(error);
    }
  }

  enableEdition() {
    this.isReadOnly = false;
  }

  profileForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    email: new FormControl(''),
    endereco: new FormControl(''),
  });

  async saveEdition() {
      const res = await this.appService.alterarDadosDoUsuario(
        this.profileForm.value.id ?? '',
        this.profileForm.value.nome ?? '',
        this.profileForm.value.email ?? '',
        this.profileForm.value.endereco ?? '',
      );

      if(res){
        this.isReadOnly = true;
        window.alert('Edição realizada com sucesso!');
        this.router.navigate(['/profile', this.usuario?.id]);
      } else {
        this.profileError = "Houve algum erro na edição. Por favor, tente novamente.";
      }
    }

  async deleteAccount () {
      const res = await this.appService.removerUsuario(this.route.snapshot.params['id']);

      if(res){
        window.alert('Conta removida com sucesso!');
        this.router.navigate(['/']);
      } else {
        this.profileError = "Houve algum erro na exclusão da conta.";
      }
  }
}
