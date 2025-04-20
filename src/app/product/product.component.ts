import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  template: `
    <body>
      <p [routerLink]="['/admin']">Voltar</p>
      <h2>Produtos</h2>
      <a [routerLink]="['/addprod']">Inserir produto</a>
      <table>
      <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Expansão</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let produto of listProds">
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.id_categoria }}</td>
            <td>{{ produto.id_expansao }}</td>
            <td>{{ produto.preco | currency }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>
              <a [routerLink]="['/editprod', produto.id]">Editar</a>
              <a (click)="deleteProduct(produto.id.toString())">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  `,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  listProds: Produto[] = [];

  appService = inject(AppService);
  
  constructor (private router: Router){}

  ngOnInit(): void {
    this.buscarProds();
  }

  async buscarProds(){
    try {
      const list = await this.appService.buscarProdutosEmEstoque();

      if(list && list.length > 0){
        this.listProds = list;
      }

    } catch (error){
      console.log(error);
    }
  }

  async deleteProduct (id: string) {
    const res = await this.appService.removerProduto(id);

    if(res){
      window.alert('Produto removido com sucesso!');
      location.reload();
    } 
}
}
