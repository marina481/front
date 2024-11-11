import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Calendario', component: CalendarioComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
    
];
