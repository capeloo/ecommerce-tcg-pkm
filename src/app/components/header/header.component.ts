import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
    <header>
      <!-- Logo -->
      <a [routerLink]="['/']" id="logo">
        <img 
          src="general/celadon-mall.png" 
          alt="Celadon Mall logo"
        >
      </a>
      
      <!-- Search bar -->
      <div id="search">
        <img 
          src="general/search.png" 
          alt="Search icon"
        >
        <input 
          type="text" 
          name="" 
          id=""
          placeholder="Procure por um produto"
        >
      </div>

      <!-- Actions -->
      <div id="actions">
        <div>
          <a [routerLink]="['/register']">
            <img 
              src="general/user.png" 
              alt="User icon"
            >
          </a>
          <a [routerLink]="['/register']">
            <p>
              Entre por aqui
            </p>
          </a>
        </div>
        <div id="divider">|</div>
        <div>
          <a [routerLink]="['/pokebag']">
            <img 
              src="general/pokebag.png" 
              alt="Pokebag icon"
            >
          </a>
          <a [routerLink]="['/pokebag']">
            <p>
              Pokébag
            </p>
          </a>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
