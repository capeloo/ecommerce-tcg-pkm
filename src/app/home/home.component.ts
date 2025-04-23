import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';
import { RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { HeaderComponent } from '../components/header/header.component';
import { Categoria } from '../../model/categoria';
import { FooterComponent } from '../components/footer/footer.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <body>
      <app-header [isUserLoggedOn]="isUserLoggedOn" [usuario]="this.usuario"></app-header>
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
          <div id="carousel1-header">
            <h1>Lançamento - <span style="color: var(--primary);">Evoluções Prismáticas</span></h1>
            <a [routerLink]="['/product']">Veja mais <span style="color: var(--primary);">></span></a>
          </div>
          <hr>
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
          <div id="carousel2-header">
            <h1>Se aventure pelas <span style="color: var(--primary);">categorias</span></h1>
            <a [routerLink]="['/product']">Veja mais <span style="color: var(--primary);">></span></a>
          </div>
          <hr>
          <div *ngFor="">
            <div>
              <img 
                src="" 
                [alt]=""
              >
              <p></p>
            </div>
          </div>
        </section>
        <!-- Carrossel 03 -->
         <section class="carousel3">
          <div id="carousel3-header">
            <h1>Novas <span style="color: var(--primary);">expansões</span></h1>
            <a [routerLink]="['/product']">Veja mais <span style="color: var(--primary);">></span></a>
          </div>
          <hr>
          <div id="carousel3-content">
            <a href=""><img src="prism-evos.png" alt=""></a>
            <a href=""><img src="stellar-crown1.png" alt=""></a>
            <a href=""><img src="paradoxal-rift.png" alt=""></a>
          </div>
         </section>
      </main>
      <app-footer></app-footer>
    </body>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  usuario: Usuario | null = null;
  isUserLoggedOn = false;

  private intervalId: any;

  products: Produto[] = [];
  startIndex = 0;
  itemsPerPage = 5;

  images = [
    'stellar-crown.jpg',
    'surging-sparks.jpg',
    'prismatic-evolution.jpg'
  ];

  currentIndex = 0;

  constructor(
    private authService: AuthService,
    private appService: AppService,
  ){
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
      this.isUserLoggedOn = !!user;
    });
  }
  
  ngOnInit(): void {
    
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

}
