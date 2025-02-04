import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario";

@Injectable({
    providedIn: 'root'
})

export class AppService {

    url = 'http://localhost:8080/api/ecommerce/';

    async autenticarUsuario(email: string, senha: string): Promise<Usuario | null>{

        const data = {
            email: email,
            senha: senha
        };

        try {
            const response = await fetch(this.url + "auth", {
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

    async desconectarUsuario() {
        try {
            const response = await fetch(this.url + "signout", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
            });

            const data = await response.json();
            return data.success;

        } catch (error) {
            console.error('Erro na autenticação:', error);
            return null; 
        }
    }
}