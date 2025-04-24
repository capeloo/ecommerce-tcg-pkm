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
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, FooterComponent, RouterModule],
  template: `
    <app-header [isUserLoggedOn]="isUserLoggedOn" [usuario]="this.usuario"></app-header>
    <div id="breadcrumbs">
      <div>
        <a [routerLink]="['/']">
          <img 
            src="general/home.png" 
            alt=""
          >
        </a>
        <p>></p>
        <a>Minha conta</a>
        <p>></p>
        <a>Dashboard</a>
      </div>
    </div>
    <body>
      <main>
        <div class="section-1">
          <nav>
            <h2>Navegação</h2>
            <div style="background-color: var(--bg1); border-left: 2px solid var(--primary);">
              <img 
                src="general/dash.png" 
                alt=""
              >
              <p>Dashboard</p>
            </div>
            <div [routerLink]="['/pokebag']">
              <img 
                src="general/bag.png" 
                alt=""
              >
              <p>Pokébag</p>
            </div>
            <div>
              <img 
                src="general/pay.png" 
                alt=""
              >
              <p>Minhas compras</p>
            </div>
            <div (click)="signOutUsuario()">
              <img 
                src="general/out.png" 
                alt=""
              >
              <p>Log-out</p>
            </div>
          </nav>
          <div class="info">
            <img 
              src="foto-perfil.jpg" 
              alt=""
            >
            <h2>{{ usuario?.nome }}</h2>
            <p>Cliente</p>
          </div>
          <div class="address">
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
                  name="endereco"
                  id="endereco"
                  formControlName="endereco"
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
              </section>

              <div class="actions">
                <button *ngIf="isReadOnly" id="edit" (click)="enableEdition()" type="button">Editar dados</button>
                <button id="save" type="submit" *ngIf="!isReadOnly">Salvar</button>
                <a id="delete" (click)="deleteAccount()">Excluir conta</a>
              </div>
            </form>
          </div>
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
    try {
      const res = await this.appService.alterarDadosDoUsuario(
        this.profileForm.value.id ?? '',
        this.profileForm.value.nome ?? '',
        this.profileForm.value.email ?? '',
        this.profileForm.value.endereco ?? '',
      );
  
      if (res) {
        if (this.usuario) {
          this.usuario.nome = this.profileForm.value.nome ?? this.usuario.nome;
          this.usuario.email = this.profileForm.value.email ?? this.usuario.email;
          this.usuario.endereco = this.profileForm.value.endereco ?? this.usuario.endereco;
        }
  
        this.authService.setUser(this.usuario);
  
        this.isReadOnly = true;
        window.alert('Edição realizada com sucesso!');
      } else {
        this.profileError = "Houve algum erro na edição. Por favor, tente novamente.";
      }
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
      this.profileError = "Erro ao salvar as alterações. Tente novamente.";
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

  async signOutUsuario() {
    try {
      await this.appService.desconectarUsuario();
      this.authService.clearUser();
      this.router.navigate(['/']);

    } catch (error) {
      console.error('Erro durante logout:', error);
      this.router.navigate(['/']);
      };
  }
}
