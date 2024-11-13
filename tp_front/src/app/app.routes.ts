import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
    // TODO: agregar path de la reserva, hay que ver bien cómo hacerlo
    
];
