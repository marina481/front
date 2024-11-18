import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';

//Conexion de los path a los componentes
export const routes: Routes = [
    { path: 'Home', component: HomeComponent },
    { path: 'Calendario', component: CalendarioComponent },
    { path: 'AgregarReserva', component: AgregarReservaComponent },
    { path: '**', redirectTo: 'Home', pathMatch: 'full' }
    // TODO: agregar path de la reserva, hay que ver bien cómo hacerlo
    
];
