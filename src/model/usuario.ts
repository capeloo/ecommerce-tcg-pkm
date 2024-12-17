export interface Usuario {
    id: number,
    email: string,
    senha: string,
    nome: string,
    administrador: boolean,
    
    // não vejo necessidade para:
    //  - login (email seria o login)
    //  - endereco
}