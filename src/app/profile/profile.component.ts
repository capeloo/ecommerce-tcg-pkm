import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../services/app.service';
import { Usuario } from '../../model/usuario';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header [isUserLoggedOn]="isUserLoggedOn" [usuario]="this.usuario"></app-header>
    <body>
      <main>
        <div class="section-1">
          <nav>
            <h2>Navegação</h2>
            <div>
              <img 
                src="" 
                alt=""
              >
              <p>Dashboard</p>
            </div>
            <div>
              <img 
                src="" 
                alt=""
              >
              <p>Pokébag</p>
            </div>
            <div>
              <img 
                src="" 
                alt=""
              >
              <p>Minhas compras</p>
            </div>
            <div>
              <img 
                src="" 
                alt=""
              >
              <p>Log-out</p>
            </div>
          </nav>
          <div>
            <img 
              src="" 
              alt=""
            >
            <h2>{{ usuario?.nome }}</h2>
            <p>Cliente</p>
          </div>
          <form [formGroup]="profileForm" (ngSubmit)="saveEdition()">
          <section class="profile-input-section">
            <h2>ENDEREÇO</h2>

            <input 
              type="text"
              name="id"
              id="id"
              formControlName="id"
              class="profile-input"
              hidden
            >

            <input 
              type="text"
              name="nome"
              id="nome"
              formControlName="nome"
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <input 
              type="text"
              name="email"
              id="email"
              formControlName="email"
              class="profile-input"
              [readonly]="isReadOnly"
            >

            <input 
              type="text"
              name="endereco"
              id="endereco"
              formControlName="endereco"
              class="profile-input"
              [readonly]="isReadOnly"
            >
          </section>

          <button (click)="enableEdition()">Editar</button>
          <button type="submit" *ngIf="isReadOnly == false">Salvar</button>
          <a (click)="deleteAccount()">Excluir conta</a>
        </form>
        </div>
        <div class="section-2">
          <div>
            <h2>Minhas compras</h2>
            <a href="">Ver todas</a>
          </div>
          <table>

          </table>
        </div>
      </main>
    </body>
    <app-footer></app-footer>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  usuario: Usuario | null = null;
  isUserLoggedOn = false;

  profileError: string = '';
  isReadOnly: boolean = true;

  profileForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    email: new FormControl(''),
    endereco: new FormControl(''),
  });

  constructor (
    private route: ActivatedRoute, 
    private router: Router,
    private appService: AppService,
    private authService: AuthService,
  ){
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
      this.isUserLoggedOn = !!user;
    });
    
    if(this.usuario){
      this.profileForm.patchValue({
        id: this.usuario.id.toString(),
        nome: this.usuario.nome,
        email: this.usuario.email,
        endereco: this.usuario.endereco
      });
    }
  }


  enableEdition() {
    this.isReadOnly = false;
  }

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
