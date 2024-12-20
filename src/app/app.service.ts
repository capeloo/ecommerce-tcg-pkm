import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario";

@Injectable({
    providedIn: 'root'
})

export class AppService {

    url = 'http://localhost:8080/api/';

    async autenticarUsuario(email: string, senha: string): Promise<Usuario | undefined>{
        const data = await fetch(`${this.url}auth?email=${email}&senha=${senha}`);
        return (await data.json()) ?? {};
    }

}