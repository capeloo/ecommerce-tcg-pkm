import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';
import { RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <body>
      <app-header></app-header>
      <main>
        <!-- Banner -->
        <section class="banner-container">
          <div class="carousel">
            <div class="carousel-inner">
              <img *ngFor="let image of images; let i = index" 
                [src]="image" 
                [alt]="'banner ' + i" 
                class="carousel-image"
                [class.active]="currentIndex === i"
              >
            </div>
            <div class="controls">
              <button (click)="prevImage()" class="prev-button"><</button>
              <button (click)="nextImage()" class="next-button">></button>
            </div>
            <!-- Indicadores -->
            <div class="indicators">
              <div class="indicator-container">
                <span *ngFor="let image of images; let i = index" 
                  (click)="goToImage(i)" 
                  [class.active]="isActive(i)" 
                  class="indicator">
                </span>
              </div>
            </div>
          </div>
        </section>
        <!-- Carrossel 01 -->
        <section class="carousel1">
          <h1>Lançamento - Expansão Fagulhas Impetuosas</h1>
          <div class="carousel1-content">
            <button (click)="handlePrev()" [disabled]="startIndex === 0">
              <
            </button>
            <div *ngFor="let product of displayedProducts">
              <div class="carousel1-card" [routerLink]="['/product-page', product.id]" [queryParams]="{id: this.usuario?.id}">
                <img src="{{ product.foto }}" [alt]="product.descricao">
                <p>{{ product.descricao }}</p>
              </div>          
            </div>
            <button (click)="handleNext()" [disabled]="startIndex + 5 >= products.length">
              >
            </button>
          </div>
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
export class HomeComponent implements OnInit, OnDestroy {

  usuario: Usuario | null = null;
  userID: string = '';
  private intervalId: any;

  products: Produto[] = [];
  startIndex = 0;
  itemsPerPage = 5;

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
    this.resetAutoRotation();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoRotation();
  }

  goToImage(index: number) {
    this.currentIndex = index;
    this.resetAutoRotation();
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }

  resetAutoRotation() {
    this.stopAutoRotation();
    this.startAutoRotation();
  }

  constructor(private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });

    const res = this.consultarUsuario(this.userID);

    this.appService.buscarProdutos().then(prods => {
      if(prods){
        this.products = prods;
      }
    });

    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  startAutoRotation() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000);
  }
  
  stopAutoRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get displayedProducts(){
    return this.products.slice(this.startIndex, this.startIndex + this.itemsPerPage);
  }

  handleNext() {
    if (this.startIndex + 1 < this.products.length) {
      this.startIndex += 1;
    }
  }

  handlePrev() {
    if (this.startIndex - 1 >= 0) {
      this.startIndex -= 1;
    }
  }

  async consultarUsuario(id: string){
    try {
      const usuario = await this.appService.consultarUsuarioPorId(id);

      if(usuario?.id){
        this.usuario = usuario;
        this.isUserLoggedOn = true;
      } 
      
    } catch (error) {
      console.log(error);
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

  async goToHome(){
    this.router.navigate(['']);
  }

  async registerUsuario(){
    this.router.navigate(['register']);
  }

  goToPokebag() {
    this.router.navigate(['/pokebag'], { queryParams: { id: this.usuario?.id } });
  }

}
