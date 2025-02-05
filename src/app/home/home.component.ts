import { Component, inject } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <body>
      <header>
        <!-- Logo -->
        <img 
          src="logo.png" 
          alt="Logo"
          id="logo"
        > 
        <!-- Search bar -->
        <div  id="search-bar">
          <img 
            id="lupa"
            src="lupa.png" 
            alt="Lupa"
          >
          <input 
            type="text" 
            placeholder="  Pesquise um produto"
          >
        </div>
        <!-- Actions -->
        <div>
          <div class="dropdown" (click)="toggleDropdown()" *ngIf="!isUserLoggedOn">
            <p class="dropdown-button">Olá, faça seu login ou cadastre-se  &#9660;</p>
            <div class="dropdown-content" *ngIf="isDropdownOpen">
              <a (click)="signInUsuario()">Entrar</a>
              <p>ou</p>
              <a (click)="registerUsuario()">cadastre-se</a>
          </div>
        </div>
        <div class="actions" *ngIf="isUserLoggedOn">
          <p>Olá, {{ this.usuario?.nome }}! <a (click)="signOutUsuario()">Sair</a></p>
          <!-- Perfil -->
          <a class="foto-perfil" (click)="goToProfile()">
            <img 
              src="foto-perfil.jpg" 
              alt="foto-perfil"
            >
          </a>
          <!-- Carrinho -->
           <a class="carrinho">
            <img 
              src="mochila.png" 
              alt="Carrinho"
            >
           </a>
        </div>

        </div>
      </header>
      <main>
        <!-- Banner -->
        <section class="banner-container">
          <div class="carousel">
            <img [src]="images[currentIndex]" alt="banner" class="carousel-image">
            <div class="controls">
              <button (click)="prevImage()" class="prev-button"><</button>
              <button (click)="nextImage()" class="next-button">></button>
            </div>
          </div>
        </section>
        <!-- Indicadores -->
        <div class="indicators">
          <span *ngFor="let image of images; let i = index" 
          (click)="goToImage(i)" 
          [class.active]="isActive(i)" 
          class="indicator"></span>
        </div>
        <!-- Tab bar -->
        <section>
          <div class="tab-bar">
            <!-- <button class="tab-links" (click)="event()">string</button> -->
            <button class="tab-links">Cards avulsos</button>
            <p>|</p>
            <button class="tab-links">Acessórios</button>
            <p>|</p>
            <button class="tab-links">Boosters e boxes</button>
            <p>|</p>
            <button class="tab-links">Expansões</button>
          </div>
        </section>
        <!-- Carrossel 01 -->
        <section class="carousel1">
          <h1>Lançamento - Expansão Fagulhas Impetuosas</h1>
        </section>
        <!-- Carrossel 02 -->
        <section class="carousel2">
          <h1>Acessórios para seu deck</h1>
        </section>
      </main>
      <footer>
        <div id="foot1">
          <img src="logo-horizontal.png" alt="logo-horizontal">
          <div>
            <h2>Siga-nos</h2>
            <div id="facebook"></div>
            <div id="instagram"></div>
            <div id="youtube"></div>
          </div>
        </div> <hr>
        <div id="foot2">
          <a href="">Nos contate</a>
          <a href="">Sobre nós</a>
          <a href="">Notícias</a>
          <a href="">Política de Privacidade</a>
        </div>
      </footer>
    </body>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuario: Usuario | null;

  appService = inject(AppService);
  
  isDropdownOpen = false;
  isUserLoggedOn = false;

  images = [
    'stellar-crown.jpg',
    'surging-sparks.jpg',
    'prismatic-evolution.jpg'
  ];

  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }

  constructor(private router: Router){
    this.usuario = history.state.usuario;

    if(this.usuario?.id){
      this.isUserLoggedOn = true;
    }
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
    
  }

  async signOutUsuario(){
    try {
      const res = await this.appService.desconectarUsuario();

      if(res){
        this.usuario = null;
        this.isUserLoggedOn = false;
        this.router.navigate(['']);     
    }} catch (error) {
      console.error(error);
    }
  }

  async signInUsuario(){
    this.router.navigate(['auth']);
  }

  async goToProfile(){
    this.router.navigate(['profile']);
  }

  async goToHome(){
    this.router.navigate(['']);
  }

  async registerUsuario(){
    this.router.navigate(['register']);
  }
}
