import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-addcat',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  template: `
    <body>
    <p [routerLink]="['/category']">Voltar</p>
      <h2>Inserir categoria</h2>
      <main>
      <form [formGroup]="addCatForm" (ngSubmit)="inserirCategoria()">

          <div *ngIf="addError">
            <p>{{ addError }}</p>
          </div>

          <section>
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

          <button type="submit">Inserir</button>
        </form>
      </main>
    </body>
  `,
  styleUrl: './addcat.component.css'
})
export class AddcatComponent {
  addError: string = '';
  
    appService = inject(AppService);
    
    constructor (private router: Router){}
  
    addCatForm = new FormGroup({
        nome: new FormControl(''),
        photo: new FormControl(''),
      });
  
      async inserirCategoria(){
            const res = await this.appService.inserirCategoria(
              this.addCatForm.value.nome ?? '',
              this.addCatForm.value.photo ?? '',
            );
    
            if(res){
              window.alert('Inserção realizada com sucesso!');
              this.router.navigate(['/category']);
            } else {
              this.addError = "Houve algum erro na inserção. Por favor, tente novamente.";
            }
        }
}
