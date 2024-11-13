import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../models/reserva.model';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{
  currentDate: string = new Date().toISOString().split('T')[0];
  maxDate: string;
  minDate: string;

  habitaciones: number[] = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304,305];
  listaReserva: Reserva[]= [];

  constructor(private _backservice: ApiService) {
    // Establecer la fecha actual como la fecha predeterminada
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)

    // Configurar la fecha mínima y máxima
    this.maxDate = '2025-12-31'; // Puedes cambiar este valor según lo que necesites
    this.minDate = this.currentDate; // Establecer una fecha mínima arbitraria

  }

   // Al inicializar
  ngOnInit(): void {
    this._backservice.getReservas().subscribe((info:Reserva[]) => {
     this.listaReserva = info;
    })
  }

  //Comprueba si las habitaciones estan ocupadas en la fecha seleccionada
  isRoomOccupied(roomNumber: number): boolean {
    return this.listaReserva.some(reserva => {
      const fechaInicio = new Date(reserva.FECHA_INICIO);
      const fechaFin = new Date(reserva.FECHA_FIN);
      const fechaSeleccionada = new Date(this.currentDate);
  
      return (
        reserva.HABITACION === roomNumber &&
        fechaSeleccionada >= fechaInicio &&
        fechaSeleccionada <= fechaFin
      );
    });
  }
  

  // Función para retroceder o avanzar la fecha
  changeDate(direction: number): void {
    const current = new Date(this.currentDate);
    current.setDate(current.getDate() + direction); // Retroceder o avanzar un día
    this.currentDate = current.toISOString().split('T')[0]; // Actualizar la fecha
  }
}
