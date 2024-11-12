import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
  currentDate: string;
  maxDate: string;
  minDate: string;

  constructor() {
    // Establecer la fecha actual como la fecha predeterminada
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)

    // Configurar la fecha mínima y máxima
    this.maxDate = today.toISOString().split('T')[0]; // Puedes cambiar este valor según lo que necesites
    this.minDate = '2020-01-01'; // Establecer una fecha mínima arbitraria
  }

  // Función para retroceder o avanzar la fecha
  changeDate(direction: number): void {
    const current = new Date(this.currentDate);
    current.setDate(current.getDate() + direction); // Retroceder o avanzar un día
    this.currentDate = current.toISOString().split('T')[0]; // Actualizar la fecha
  }
}
