import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },

    {
        path: 'admin',
        component: HomeAdminComponent,
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
        path: 'profile/:id',
        component: ProfileComponent,
    }
];
