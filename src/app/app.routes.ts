import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    
    {
        path: 'auth',
        component: AuthComponent,
    },

    {
        path: 'register',
        component: RegisterComponent,
    },

    {
        path: 'profile',
        component: ProfileComponent,
    }
];
