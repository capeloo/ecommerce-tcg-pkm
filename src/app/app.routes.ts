import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { AddprodComponent } from './product/addprod/addprod.component';
import { EditprodComponent } from './product/editprod/editprod.component';
import { AddcatComponent } from './category/addcat/addcat.component';
import { EditcatComponent } from './category/editcat/editcat.component';

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
    },

    {
        path: 'product',
        component: ProductComponent,
    },

    {
        path: 'category',
        component: CategoryComponent,
    },

    {
        path: 'addprod',
        component: AddprodComponent,
    },

    {
        path: 'editprod/:id',
        component: EditprodComponent,
    },

    {
        path: 'addcat',
        component: AddcatComponent,
    },

    {
        path: 'editcat/:id',
        component: EditcatComponent,
    },
];
