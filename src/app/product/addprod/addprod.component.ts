import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-addprod',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <body>
      <p [routerLink]="['/product']">Voltar</p>
      <h2>Inserir produto</h2>
      <main>
      <form [formGroup]="addProdForm" (ngSubmit)="inserirProduto()">

          <div *ngIf="addError">
            <p>{{ addError }}</p>
          </div>

          <section>
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

          <button type="submit">Inserir</button>
        </form>
      </main>
    </body>
  `,
  styleUrl: './addprod.component.css'
})
export class AddprodComponent {
  addError: string = '';

  appService = inject(AppService);
  
  constructor (private router: Router){}

  addProdForm = new FormGroup({
      id_expansao: new FormControl(''),
      id_categoria: new FormControl(''),
      descricao: new FormControl(''),
      preco: new FormControl(''),
      foto: new FormControl(''),
      quantidade: new FormControl(''),
    });

    async inserirProduto(){
          const res = await this.appService.inserirProduto(
            this.addProdForm.value.id_expansao ?? '',
            this.addProdForm.value.id_categoria ?? '',
            this.addProdForm.value.descricao ?? '',
            this.addProdForm.value.preco ?? '',
            this.addProdForm.value.foto ?? '',
            this.addProdForm.value.quantidade ?? '',
          );
  
          if(res){
            window.alert('Inserção realizada com sucesso!');
            this.router.navigate(['/product']);
          } else {
            this.addError = "Houve algum erro na inserção. Por favor, tente novamente.";
          }
      }
}
