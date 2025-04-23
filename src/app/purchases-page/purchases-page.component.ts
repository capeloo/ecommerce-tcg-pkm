import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Venda } from '../../model/venda';

@Component({
  selector: 'app-purchases-page',
  imports: [CommonModule],
  template: `
    <body>
      <a (click)="goBackToHome()">
        <img 
          src="logo.png" 
          alt="Logo"
          id="logo"
        > 
      </a>

      <h1>Minhas Compras</h1>
      <main>  
      <table class="product-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Quantidade</th>
              <th>Valor total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let compra of compras">
              <td>{{ compra.id }}</td>
              <td>{{ compra.data_hora }}</td>
              <td>{{ compra.quantidadeTotal }}</td>
              <td>{{ compra.valorTotal | currency }}</td>
              <td>
                <button (click)="seeDetails()">Ver detalhes</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </body>
  `,
  styleUrl: './purchases-page.component.css'
})
export class PurchasesPageComponent implements OnInit {
  compras: Venda[] = [];
  id: string = "";

   appService = inject(AppService);

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']; 
    });

    console.log(this.id);

    this.buscarCompras();
  }

  async buscarCompras(){
    try {
      const compras = await this.appService.obterComprasDoCliente(this.route.snapshot.params['id']);
      if(compras && compras.length > 0){
        this.compras = compras;
      }
    } catch (error){
      console.log(error);
    }
  }

  seeDetails() {}

  goBackToHome() {
    if (this.id) {
      this.router.navigate(['/'], { queryParams: { id: this.id } });
    } else {
      this.router.navigate(['/']);
    }
  }

}
