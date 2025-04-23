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
      </div>
    </nav>
    <body>
      <main>
        <div class="filters">
          <div>
            <h2>Categorias</h2>
            <div>
              <p>Cartas</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Blisters</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Boxes</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Cases</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Moedas</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Latas</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Boosters avulsos</p>
              <input type="checkbox" name="" id="">
            </div>
          </div>
          <div>
            <h2>Expansões</h2>
            <div>
              <p>Evoluções prismáticas</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Coroa estelar</p>
              <input type="checkbox" name="" id="">
            </div>
            <div>
              <p>Fenda paradoxal</p>
              <input type="checkbox" name="" id="">
            </div> 
            <button>Filtrar</button>
          </div>
        </div> 
        <div>
          <h1>Produtos</h1>
          <div class="produtos">
            <div [routerLink]="['/product-page', produto.id ]" *ngFor="let produto of listProds">
              <img 
                src="{{ produto.foto }}" 
                alt=""
              >
              <p>{{ produto.descricao }}</p>
              <div>
                <h2>{{ produto.quantidade }} u.</h2>
                <h2>R$ {{ produto.preco }}</h2> 
              </div>    
            </div>
          </div>
        </div>
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
      const list = await this.appService.buscarProdutos();

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
