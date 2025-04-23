import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Usuario } from "../../model/usuario";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(){
        const storedUser = localStorage.getItem('currentUser');
        if(storedUser){
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    setUser(user: any){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): Usuario | null {
        return this.currentUserSubject.value;
      }

    clearUser() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }
}