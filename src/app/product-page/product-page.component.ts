import { Component, inject, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <body>
      <main>
      <a (click)="goBackToHome()">
        <img 
          src="logo.png" 
          alt="Logo"
          id="logo"
        > 
      </a>
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
  `,
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  product: Produto | null = null;
  quantity: number = 1;
  id: string | null = null;

  appService = inject(AppService);

  pokebagItemForm = new FormGroup({
      produtoId: new FormControl(''),
      quantidade: new FormControl(''),
    });

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.consultarProduto();

    this.route.queryParams.subscribe(params => {
      this.id = params['id']; 
    });

    console.log(this.id);
  }

  async addProductToPokebag() {
    const res = await this.appService.adicionarProdutoNaPokebag(
      this.product?.id.toString() ?? '',
      this.pokebagItemForm.value.quantidade ?? '',
      
    );

    if(res){
      window.alert('Item adicionado à pokébag com sucesso!');
      if (this.id) {
        this.router.navigate(['/'], { queryParams: { id: this.id } });
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

  goBackToHome() {
    if (this.id) {
      this.router.navigate(['/'], { queryParams: { id: this.id } });
    } else {
      this.router.navigate(['/']);
    }
  }
}
