import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario";
import { Produto } from "../model/produto";
import { Categoria } from "../model/categoria";

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
                body: new URLSearchParams(data),
                credentials: 'include'
            });  

        const usuario: Usuario = await response.json();
        return usuario;
        
        } catch (error) {
            console.error('Erro na autenticação:', error);
            return null;
        }
    } 

    async adicionarProdutoNaPokebag(produtoId: string, quantidade: string){

        const data = {
            produtoId: produtoId,
            quantidade: quantidade,
        };

        try {
            const response = await fetch(this.url + "addprodbag", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data),
                credentials: 'include'
            });  

            if (!response.ok) {
                throw new Error(`Erro ao adicionar produto: ${response.statusText}`);
            }
    
            return true;
        
        } catch (error) {
            console.error("Erro ao adicionar produto à Pokébag:", error);
            return false;
        }
    } 

    async desconectarUsuario() {
        try {
            const response = await fetch(this.url + "signout", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                credentials: 'include'
            });

            const data = await response.json();
            return data.success;

        } catch (error) {
            console.error('Erro na autenticação:', error);
        }
    }

    async cadastrarUsuario(nome: string, email: string, senha: string) {

        const data = {
            nome: nome,
            email: email,
            senha: senha
        }

        try {
            const response = await fetch(this.url + "register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro no cadastro', error);
        }
    }

    async consultarUsuarioPorId(id: string){

        const data = {
            id: id,
        };

        try {
            const response = await fetch(this.url + "search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams(data)
            });

            const usuario: Usuario = await response.json();
            return usuario;
        } catch (error) {
            console.error('Erro na consulta:', error);
            return null;
        }

    }

    async alterarDadosDoUsuario(id: string, nome: string, email: string, endereco: string){

        const data = {
            id: id,
            nome: nome,
            email: email,
            endereco: endereco,
        }

        try {
            const response = await fetch(this.url + "edit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include",
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro na edição', error);
        }
    }

    async removerUsuario(id: string) {

        const data = {
            id: id,
        }

        try {
            const response = await fetch(this.url + "delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include",
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro no cadastro', error);
        }
    }

    async buscarProdutosEmEstoque(){
        try {
            const response = await fetch(this.url + "stock", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const produtos: Produto[] = await response.json();
            return produtos;
        } catch (error) {
            console.error('Erro ao trazer produtos:', error);
            return null;
        }
    }

    async buscarProdutos(){
        try {
            const response = await fetch(this.url + "listprod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const produtos: Produto[] = await response.json();
            return produtos;
        } catch (error) {
            console.error('Erro ao trazer produtos:', error);
            return null;
        }
    }

    async inserirProduto(id_expansao: string, id_categoria: string, descricao: string, preco: string, foto: string, quantidade: string) {

        const data = {
            id_expansao: id_expansao,
            id_categoria: id_categoria,
            descricao: descricao,
            preco: preco,
            foto: foto,
            quantidade: quantidade,
        }

        try {
            const response = await fetch(this.url + "addprod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao inserir produto', error);
        }
    }

    async editarProduto(id: string, id_expansao: string, id_categoria: string, descricao: string, preco: string, foto: string, quantidade: string) {

        const data = {
            id: id,
            id_expansao: id_expansao,
            id_categoria: id_categoria,
            descricao: descricao,
            preco: preco,
            foto: foto,
            quantidade: quantidade,
        }

        try {
            const response = await fetch(this.url + "editprod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao editar produto', error);
        }
    }

    async obterProdutoPorId(id: string){
        const data = {
            id: id,
        };

        try {
            const response = await fetch(this.url + "searchprod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            const produto: Produto = await response.json();
            return produto;
        } catch (error) {
            console.error('Erro na consulta:', error);
            return null;
        }
    }

    async removerProduto(id: string) {

        const data = {
            id: id,
        }

        try {
            const response = await fetch(this.url + "deleteprod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include",
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao deletar', error);
        }
    }

    async buscarCategorias(){
        try {
            const response = await fetch(this.url + "listcat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const categorias: Categoria[] = await response.json();
            return categorias;
        } catch (error) {
            console.error('Erro ao trazer categorias:', error);
            return null;
        }
    }

    async removerCategoria(id: string) {

        const data = {
            id: id,
        }

        try {
            const response = await fetch(this.url + "deletecat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include",
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao deletar', error);
        }
    }

    async inserirCategoria(nome: string) {

        const data = {
            nome: nome,
        }

        try {
            const response = await fetch(this.url + "addcat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao inserir produto', error);
        }
    }

    async obterCategoriaPorId(id: string){
        const data = {
            id: id,
        };

        try {
            const response = await fetch(this.url + "searchcat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });

            const categoria: Categoria = await response.json();
            return categoria;
        } catch (error) {
            console.error('Erro na consulta:', error);
            return null;
        }
    }

    async editarCategoria(id: string, nome: string) {

        const data = {
            id: id,
            nome: nome,
        }

        try {
            const response = await fetch(this.url + "editcat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
                body: new URLSearchParams(data)
            });

            const result = await response.json();
            return result.success;

        } catch (error) {
            console.error('Erro ao editar categoria', error);
        }
    }
}