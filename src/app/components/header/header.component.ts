import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  template: `
    <header>
      <!-- Logo -->
      <a [routerLink]="['/']" id="logo">
        <img 
          src="general/celadon-mall.png" 
          alt="Celadon Mall logo"
        >
      </a>
      
      <!-- Search bar -->
      <div id="search">
        <img 
          src="general/search.png" 
          alt="Search icon"
        >
        <input 
          type="text" 
          name="" 
          id=""
          placeholder="Procure por um produto"
        >
      </div>

      <!-- Actions -->
      <div id="actions">
        <div *ngIf="!isUserLoggedOn">
          <a [routerLink]="['/auth']">
            <img 
              src="general/user.png" 
              alt="User icon"
            >
          </a>
          <a [routerLink]="['/auth']">
            <p>
              Entre por aqui
            </p>
          </a>
        </div>
        <div id="profile" *ngIf="isUserLoggedOn">
          <a [routerLink]="['/profile', usuario?.id]">
            <img 
              src="foto-perfil.jpg" 
              alt=""
            >
          </a>
          <p>Olá, {{ usuario?.nome }}!</p>
          <a (click)="signOutUsuario()">Sair</a>
        </div>
        <div id="divider">|</div>
        <div>
          <a [routerLink]="['/pokebag']">
            <img 
              src="general/pokebag.png" 
              alt="Pokebag icon"
            >
          </a>
          <a [routerLink]="['/pokebag']">
            <p>
              Pokébag
            </p>
          </a>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isUserLoggedOn: boolean = false;
  @Input() usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private appService: AppService,
    private authService: AuthService,
  ){}
  
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
