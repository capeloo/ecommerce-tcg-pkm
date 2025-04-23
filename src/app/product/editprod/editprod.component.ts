import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Produto } from '../../../model/produto';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-editprod',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <body>
      <p [routerLink]="['/product']">Voltar</p>
      <h2>{{ this.prod?.descricao }}</h2>
      <main>
        <form [formGroup]="editProdForm" (ngSubmit)="editarProduto()">

          <div *ngIf="editError">
            <p>{{ editError }}</p>
          </div>

          <section>
            <input 
              type="text" 
              name="id" 
              id="id" 
              placeholder="ID" 
              formControlName="id"  
              hidden
            >

            <input 
              type="text" 
              name="id_expansao" 
              id="id_expansao" 
              placeholder="Expansão" 
              formControlName="id_expansao"  
              required
            >

            <input 
              type="text" 
              name="id_categoria" 
              id="id_categoria" 
              placeholder="Categoria" 
              formControlName="id_categoria"  
              required
            >

            <input 
              type="text" 
              name="descricao" 
              id="descricao" 
              placeholder="Nome" 
              formControlName="descricao"  
              required
            >

            <input 
              type="text" 
              name="preco" 
              id="preco" 
              placeholder="Preço" 
              formControlName="preco"  
              required
            >

            <input 
              type="text" 
              name="foto" 
              id="foto" 
              placeholder="Foto" 
              formControlName="foto"  
              hidden
            >

            <input 
              type="text" 
              name="quantidade" 
              id="quantidade" 
              placeholder="Quantidade" 
              formControlName="quantidade"  
              required
            >
          
          </section>

          <button type="submit">Editar</button>
        </form>
      </main>
    </body>
  `,
  styleUrl: './editprod.component.css'
})
export class EditprodComponent implements OnInit {
  prod: Produto | null = null;
  editError: string = '';

  appService = inject(AppService);

  ngOnInit(): void {
    this.consultarProduto();
  }

  constructor (private router: Router, private route: ActivatedRoute){}

  editProdForm = new FormGroup({
        id: new FormControl(''),
        id_expansao: new FormControl(''),
        id_categoria: new FormControl(''),
        descricao: new FormControl(''),
        preco: new FormControl(''),
        foto: new FormControl(''),
        quantidade: new FormControl(''),
  });

  async consultarProduto(){
    try {
      const produto = await this.appService.obterProdutoPorId(this.route.snapshot.params['id']);

      if(produto?.id){
        this.prod = produto;

        this.editProdForm.patchValue({
          id: this.prod.id.toString(),
          id_expansao: this.prod.id_expansao.toString(),
          id_categoria: this.prod.id_categoria.toString(),
          descricao: this.prod.descricao,
          preco: this.prod.preco.toString(),
          foto: this.prod.foto,
          quantidade: this.prod.quantidade.toString(),
        });
      } else {
        window.alert('Houve um erro na consulta. Por favor, tente novamente');
        this.router.navigate(['/product']);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async editarProduto(){
    const res = await this.appService.editarProduto(
      this.editProdForm.value.id ?? '',
      this.editProdForm.value.id_expansao ?? '',
      this.editProdForm.value.id_categoria ?? '',
      this.editProdForm.value.descricao ?? '',
      this.editProdForm.value.preco ?? '',
      this.editProdForm.value.foto ?? '',
      this.editProdForm.value.quantidade ?? '',
    );

    if(res){
      window.alert('Alteração realizada com sucesso!');
      this.router.navigate(['/product']);
    } else {
      this.editError = "Houve algum erro na alteração. Por favor, tente novamente.";
    }
  }
}
