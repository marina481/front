import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';

//Conexion de los path a los componentes
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Calendario', component: CalendarioComponent },
    { path: 'Habitaciones', component:HabitacionesComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' },
    
    
];
