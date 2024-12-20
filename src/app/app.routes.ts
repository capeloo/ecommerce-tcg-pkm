import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    },
    
    {
        path: 'home',
        component: HomeComponent,
    }
];
