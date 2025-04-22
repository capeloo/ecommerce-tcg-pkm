import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  template: `
    <header>
      <!-- Logo -->
      <a [routerLink]="['/']" [queryParams]="{id: usuario?.id}" id="logo">
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
          <a [routerLink]="['/pokebag']" [queryParams]="{id: usuario?.id}">
            <img 
              src="general/pokebag.png" 
              alt="Pokebag icon"
            >
          </a>
          <a [routerLink]="['/pokebag']" [queryParams]="{id: usuario?.id}">
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

  appService = inject(AppService);
  private router = inject(Router);
  
  async signOutUsuario() {
    try {
      await this.appService.desconectarUsuario();
      await this.router.navigate(['/']);
      window.location.reload();
      
    } catch (error) {
      console.error('Erro durante logout:', error);

      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }
}
