import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../model/categoria';
import { AppService } from '../../services/app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editcat',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <body>
    <p [routerLink]="['/category']">Voltar</p>
      <h2>{{ this.cat?.nome }}</h2>
      <main>
        <form [formGroup]="editCatForm" (ngSubmit)="editarCategoria()">

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
              name="nome" 
              id="nome" 
              placeholder="Nome" 
              formControlName="nome"  
              required
            >          

            <input 
              type="text" 
              name="photo" 
              id="photo" 
              placeholder="Foto" 
              formControlName="photo"  
              required
            >        
          </section>

          <button type="submit">Editar</button>
        </form>
      </main>
    </body>
  `,
  styleUrl: './editcat.component.css'
})
export class EditcatComponent implements OnInit {
  cat: Categoria | null = null;
    editError: string = '';
  
    appService = inject(AppService);
  
    ngOnInit(): void {
      this.consultarCategoria();
    }
  
    constructor (private router: Router, private route: ActivatedRoute){}
  
    editCatForm = new FormGroup({
          id: new FormControl(''),
          nome: new FormControl(''),
          photo: new FormControl(''),
    });
  
    async consultarCategoria(){
      try {
        const categoria = await this.appService.obterCategoriaPorId(this.route.snapshot.params['id']);
  
        if(categoria?.id){
          this.cat = categoria;
  
          this.editCatForm.patchValue({
            id: this.cat?.id.toString(),
            nome: this.cat?.nome,
          });
        } else {
          window.alert('Houve um erro na consulta. Por favor, tente novamente');
          this.router.navigate(['/category']);
        }
  
      } catch (error) {
        console.log(error);
      }
    }
  
    async editarCategoria(){
      const res = await this.appService.editarCategoria(
        this.editCatForm.value.id ?? '',
        this.editCatForm.value.nome ?? '',
        this.editCatForm.value.photo ?? '',
      );
  
      if(res){
        window.alert('Alteração realizada com sucesso!');
        this.router.navigate(['/category']);
      } else {
        this.editError = "Houve algum erro na alteração. Por favor, tente novamente.";
      }
    }
}
