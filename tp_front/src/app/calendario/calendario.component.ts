import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../models/reserva.model';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{
  currentDate: string = new Date().toISOString().split('T')[0];
  maxDate: string;
  minDate: string;

  habitaciones: number[] = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304,305];
  listaReserva: Reserva[]= [];

  showModal: boolean = false;
  selectedRoomNumber: number | null = null;

  constructor(private _backservice: ApiService, private _router: Router) {
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

  //Funciones del Modal de confirmación
  openModal(roomNumber: number): void {
    this.selectedRoomNumber = roomNumber;
    this.showModal = true;
  }
  
  confirmDelete(): void {
    const reservaBuscada = this.listaReserva.find(
      (reserva) => 
        reserva.HABITACION === this.selectedRoomNumber &&
        new Date(this.currentDate) >= new Date(reserva.FECHA_INICIO) &&
        new Date(this.currentDate) <= new Date(reserva.FECHA_FIN)
    );
    if (reservaBuscada) {
      this._backservice.eliminarReserva(reservaBuscada.ID).subscribe(() => {
      console.log(`La reserva ${reservaBuscada.ID} fue eliminada con exito`)
      console.log(`Reserva de la habitación ${this.selectedRoomNumber} eliminada.`);
      },
      (error) => {
        console.error(`Error al Eliminar la reserva: ${error}`);
      });
    }
    else{
      console.log("No hay reserva para eliminar")
    }
    this.showModal = false;
    this.selectedRoomNumber = null;
  }
  
  cancelDelete(): void {
    this.showModal = false;
  }
  
  async roomLink(roomNumber: number) {
    
    const Room = await this.isRoomOccupied(roomNumber)
    
    if (Room) {
      this.openModal(roomNumber)

    } else {
      this._router.navigate(['/AgregarReserva']);
    }
  }
}