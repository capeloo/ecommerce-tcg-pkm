import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
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
        <div>
          <!-- Perfil -->
          <!--
          <a (click)="goToProfile()">
            <img 
            src="" 
            alt="Perfil"
            >
          </a>
          -->
          <div id="dropdown">
            <p class="dropbtn">Olá, faça seu login ou cadastre-se</p>
            <div class="dropdown-content">
              <a (click)="signInUsuario()">Entrar</a>
              <a (click)="registerUsuario()">cadastre-se</a>
            </div>
            <!--
            
            -->
          </div>
          
          <!-- 
          <a (click)="signOutUsuario()">Sair</a>
          -->
          <!-- Carrinho -->
          <!--
          <img 
            src="" 
            alt="Carrinho"
          >
          -->
        </div>
      </header>
      <main>
        <!-- Banner -->
        <section class="banner"></section>
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

  appService = inject(AppService);

  constructor(private router: Router){}

  async signOutUsuario(){
    const response = await this.appService.desconectarUsuario();

    if(response){
      this.router.navigate(['']);
    } else {

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
