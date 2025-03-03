import { Component, inject, OnInit } from '@angular/core';
import { PokebagItem } from '../../model/pokebagItem';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokebag-page',
  imports: [CommonModule],
  template: `
    <body>
      <h1>Minha Pokébag</h1>
      <main>  
      <table class="product-list">
          <thead>
            <tr>
              <th>PRODUTOS</th>
              <th>PREÇO</th>
              <th>QUANTIDADE</th>
              <th>SUBTOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items">
              <td id="product-description">
                <img src="{{ item.produto.foto }}" alt="foto-item" />
                <p>{{ item.produto.descricao }}</p>
              </td>
              <td>{{ item.produto.preco | currency }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ (item.produto.preco) * (item.quantidade) | currency }}</td>
              <td>
                <button (click)="removerProduto(item.produto.id)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <h2>Pokébag Total</h2>
          <div id="subtotal">
            <p>Subtotal:</p>
            <h4>{{ total | currency }}</h4>
          </div>
          <div id="real-total">
            <p>Total:</p>
            <h3>{{ total | currency }}</h3>
          </div>
          <button>Realizar compra</button>
        </div>
      </main>
    </body>
  `,
  styleUrl: './pokebag-page.component.css'
})
export class PokebagPageComponent implements OnInit {
  items: PokebagItem[] = [];
  total: number = 0;

  appService = inject(AppService);

  ngOnInit(): void {
    this.buscarItems();
  }

  async buscarItems(){
    try {
      const items = await this.appService.obterPokebagItems();
      if(items && items.length > 0){
        this.items = items;
        this.calcularTotal();
      }
    } catch (error){
      console.log(error);
    }
  }

  calcularTotal() {
    this.total = this.items.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
  }

  async removerProduto(produtoId: number){
    try {
      const res = await this.appService.removerProdutoNaPokebag(produtoId.toString());

      if(res){
        window.location.reload();
      }

    } catch (error){
      console.log(error);
    }
  }

}
