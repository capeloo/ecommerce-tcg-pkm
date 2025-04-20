import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <div>
        <img 
          src="general/celadon-mall.png" 
          alt=""
        >
        <div id="sobre">
          <h2>Sobre nós</h2>
          <hr>
          <p>
            Somos graduandos em Sistemas e Mídias Digitais pela Universidade
            Federal do Ceará. Este e-commerce é o projeto final da cadeira de 
            Programação Web I, ministrada pelo queridíssimo Professor Doutor
            Leonardo Moreira.
          </p>
        </div>
        <div id="contatos">
          <h2>Contatos</h2>
          <hr>
          <div>
            <img 
              src="general/linkedin.png" 
              alt=""
            >
            <div>
              <h3>Linkedin</h3>
              <a href="https://www.linkedin.com/in/capeloo" target="_blank">https://www.linkedin.com/in/capeloo</a>
            </div>
          </div>
        <div>
            <img 
              src="general/linkedin.png" 
              alt=""
            >
            <div>
              <h3>Linkedin</h3>
              <a href="https://www.linkedin.com/in/brunonobregadev" target="_blank">https://www.linkedin.com/in/brunonobregadev</a>
            </div>
          </div>
          <div>
            <img 
              src="general/linkedin.png" 
              alt=""
            >
            <div>
              <h3>Linkedin</h3>
              <a href="https://www.linkedin.com/in/isadora-granato-852627195" target="_blank">https://www.linkedin.com/in/isadora-granato-852627195</a>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <p>Todos os direitos reservados.</p>
    </footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
