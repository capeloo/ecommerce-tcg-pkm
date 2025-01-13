import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario";

@Injectable({
    providedIn: 'root'
})

export class AppService {

    url = 'http://localhost:8080/api/ecommerce/login';

    async autenticarUsuario(email: string, senha: string): Promise<Usuario | null>{

        const data = {
            email: email,
            senha: senha
        };

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });  

        const usuario: Usuario = await response.json();
        return usuario;
        
        } catch (error) {
            console.error('Erro na autenticação:', error);
            return null; 
        }
    } 

}