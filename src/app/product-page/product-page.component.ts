import { Component, inject, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AuthService } from '../services/auth.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-product-page',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HeaderComponent, FooterComponent, RouterModule],
  template: `
    <app-header [isUserLoggedOn]="isUserLoggedOn" [usuario]="this.usuario"></app-header>
    <nav id="breadcrumbs">
      <div>
        <a [routerLink]="['/']">
          <img 
            src="general/home.png" 
            alt=""
          >
        </a>
        <p>></p>
        <a [routerLink]="['/product']">Produtos</a>
        <p>></p>
        <a [routerLink]="['/product-page', product?.id]" [queryParams]="{id: this.usuario?.id}">{{ product?.descricao }}</a>
      </div>
    </nav>
    <body>
      <main>
        <form [formGroup]="pokebagItemForm" (ngSubmit)="addProductToPokebag()" class="form-content">
          <img src="{{ product?.foto }}" [alt]="product?.descricao">
          <div>
            <p>{{ product?.descricao }}</p>
            <div class="quantity-selector">
              <button type="button" id="btn1" (click)="decreaseQuantity()">-</button>
              <input 
                type="text" 
                [(ngModel)]="quantity" 
                name="quantity" 
                min="1"
                formControlName="quantidade"
              >
              <button type="button" id="btn2" (click)="increaseQuantity()">+</button>
            </div>
            <button type="submit">Adicionar a pokébag</button>
          </div>    
        </form>
      </main>
    </body>
    <app-footer></app-footer>
  `,
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  product: Produto | null = null;
  quantity: number = 1;
  id: string | null = null;

  usuario: Usuario | null = null;
  isUserLoggedOn = false;

  pokebagItemForm = new FormGroup({
      produtoId: new FormControl(''),
      quantidade: new FormControl(''),
    });

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private appService: AppService,
    private authService: AuthService,
  ){
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
      this.isUserLoggedOn = !!user;
    });
  }

  ngOnInit(): void {
    this.consultarProduto();
  }

  async addProductToPokebag() {
    const res = await this.appService.adicionarProdutoNaPokebag(
      this.product?.id.toString() ?? '',
      this.pokebagItemForm.value.quantidade ?? '',
      
    );

    if(res){
      window.alert('Item adicionado à pokébag com sucesso!');
      if (this.id) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/']);
    }
    } else {
      window.alert('Houve algum erro. Por favor, tente novamente');
    }
  }

  async consultarProduto(){
    try {
      const product = await this.appService.obterProdutoPorId(this.route.snapshot.params['id']);

      if(product?.id){
        this.product = product;

      } else {
        window.alert('Houve um erro na consulta. Por favor, tente novamente');
        this.router.navigate(['/']);
      }

    } catch (error) {
      console.log(error);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
