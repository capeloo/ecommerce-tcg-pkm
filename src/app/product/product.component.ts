import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { AppService } from '../services/app.service';
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { Usuario } from '../../model/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header [isUserLoggedOn]="isUserLoggedOn" [usuario]="this.usuario"></app-header>
    <body>
      <main>
        <h1>Produtos</h1>
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
      </main>
    </body>
    <app-footer></app-footer>
  `,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  listProds: Produto[] = [];

  usuario: Usuario | null = null;
  isUserLoggedOn = false;
  
  constructor (
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
