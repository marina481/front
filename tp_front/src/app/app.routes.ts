import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';

//Conexion de los path a los componentes
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Calendario', component: CalendarioComponent },
    { path: 'AgregarReserva', component: AgregarReservaComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
    // TODO: agregar path de la reserva, hay que ver bien cómo hacerlo
    
];
