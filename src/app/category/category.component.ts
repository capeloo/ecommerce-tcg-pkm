import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../model/categoria';
import { AppService } from '../app.service';

@Component({
  selector: 'app-category',
  imports: [RouterModule, CommonModule],
  template: `
    <body>
    <p [routerLink]="['/admin']">Voltar</p>
      <h2>Categorias</h2>
      <a [routerLink]="['/addcat']">Inserir categoria</a>
      <table>
      <thead>
          <tr>
            <th>Nome</th>
            <th>Foto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let categoria of listCats">
            <td>{{ categoria.nome }}</td>
            <td>{{ categoria.photo }}</td>
            <td>
              <a [routerLink]="['/editcat', categoria.id]">Editar</a>
              <a (click)="deleteCategory(categoria.id.toString())">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  `,
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  listCats: Categoria[] = [];
  
    appService = inject(AppService);
    
    constructor (private router: Router){}
  
    ngOnInit(): void {
      this.buscarCats();
    }
  
    async buscarCats(){
      try {
        const list = await this.appService.buscarCategorias();
  
        if(list && list.length > 0){
          this.listCats = list;
        }
  
      } catch (error){
        console.log(error);
      }
    }
  
    async deleteCategory (id: string) {
      const res = await this.appService.removerCategoria(id);
  
      if(res){
        window.alert('Categoria removida com sucesso!');
        location.reload();
      } 
  }
}
