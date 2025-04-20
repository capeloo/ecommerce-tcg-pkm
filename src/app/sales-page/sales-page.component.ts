import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { Venda } from '../../model/venda';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-page',
  imports: [RouterModule, CommonModule],
  template: `
        <body>
          <p [routerLink]="['/admin']">Voltar</p>
          <h2>Vendas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Quantidade</th>
                <th>Valor total</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let venda of listVendas">
                <td>{{ venda.id }}</td>
                <td>{{ venda.data_hora }}</td>
                <td>{{ venda.quantidadeTotal }}</td>
                <td>{{ venda.valorTotal | currency }}</td>
                <td>
                <button (click)="seeDetails()">Ver detalhes</button>
                </td>
                <td>
                  <button (click)="excluirVenda(venda.id.toString())">x</button>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      `,
  styleUrl: './sales-page.component.css',
})

export class SalesPageComponent {
  listVendas: Venda[] = [];
    
  appService = inject(AppService);
      
  constructor (private router: Router){}
    
  ngOnInit(): void {
    this.buscarVendas();
  }
    
  async buscarVendas(){
    try {
      const list = await this.appService.buscarVendas();
    
      if(list && list.length > 0){
        this.listVendas = list;
      }
    
      } catch (error){
        console.log(error);
      }
  }

  async excluirVenda(id: string) {
    const res = await this.appService.removerVendaPorID(id);
    
    if(res){
      window.alert('Venda removida com sucesso!');
      location.reload();
    } 
  }

  seeDetails() {
    throw new Error('Method not implemented.');
  }

}
