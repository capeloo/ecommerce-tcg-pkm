import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Produto } from '../../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-admin',
  imports: [RouterModule, CommonModule],
  template: `
    <body>
      <p>Olá, {{ usuario?.nome }}! <a (click)="signOutUsuario()">Sair</a></p>
      <div>
        <a [routerLink]="['/product']">Produtos</a>
        <a [routerLink]="['/category']">Categorias</a>
        <a [routerLink]="['/sales']" >Vendas</a>
      </div>
      <h1>Produtos em estoque</h1>
      <table>
      <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Expansão</th>
            <th>Preço</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let produto of listProds">
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.id_categoria }}</td>
            <td>{{ produto.id_expansao }}</td>
            <td>{{ produto.preco | currency }}</td>
            <td>{{ produto.quantidade }}</td>
          </tr>
        </tbody>
      </table>
    </body>
  `,
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  usuario: Usuario | null = null;
  listProds: Produto[] = [];
  userID: string = '';

  appService = inject(AppService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });

    this.consultarUsuario(this.userID);
    this.buscarProdsEmEstoque();
  }

  constructor (private route: ActivatedRoute, private router: Router) {}

  async consultarUsuario(id: string){
    try {
      const usuario = await this.appService.consultarUsuarioPorId(id);

      if(usuario?.id){
        this.usuario = usuario;
        //this.isUserLoggedOn = true;
      } 
      
    } catch (error) {
      console.log(error);
    }
  }

  async signOutUsuario(){
    try {
      const res = await this.appService.desconectarUsuario();

      if(res){
        this.usuario = null;
        this.router.navigate(['']);     
    }} catch (error) {
      console.error(error);
    }
  }

  async buscarProdsEmEstoque(){
    try {
      const list = await this.appService.buscarProdutosEmEstoque();

      if(list && list.length > 0){
        this.listProds = list;
      }

    } catch (error){
      console.log(error);
    }
  }

}
