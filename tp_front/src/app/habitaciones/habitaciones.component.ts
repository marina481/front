import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IHabitacion } from '../models/habitacion.models';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
})
export class HabitacionesComponent implements OnInit {
  habitaciones: IHabitacion[] = [];
  // bedrooms = [
  //   {
  //     title: 'Habitación 1',
  //     price: 100,
  //     description: 'Habitación con cama matrimonial',
  //     imageUpload: 'https://i.ibb.co/w4CYTDp/105031814.webp',
  //   },
  //   {
  //     title: 'Habitación 2',
  //     price: 150,
  //     description: 'Habitación con cama matrimonial y jacuzzi',
  //     imageUpload: 'https://i.ibb.co/w4CYTDp/105031814.webp',
  //   },
  // ];
  constructor(
    private habitacionService: HabitacionService) {}

  ngOnInit() {
    this.obtenerHabitaciones();
  }

  // Objeto para capturar la nueva habitación
  newRoom: IHabitacion = {
    TITLE: '',
    PRICE: 0,
    DESCRIPTION: '',
    IMAGEUPLOAD: '',
  };

  obtenerHabitaciones() {
    this.habitacionService.getHabitaciones().subscribe(
      (res: any) => {
        this.habitaciones = res;
        //console.log(this.habitaciones);
      },
      (err) => {
        console.error('Error al obtener las habitaciones', err);
      }
    )   
  }

  // Método para agregar una nueva habitación
  agregarHabitacion(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const newRoom: any = {
      title: this.newRoom.TITLE,
      price: this.newRoom.PRICE,
      description: this.newRoom.DESCRIPTION,
      imageUpload: this.newRoom.IMAGEUPLOAD,
    };

    this.habitacionService.agregarHabitacion(newRoom).subscribe(
      (res: IHabitacion) => {
        try {
          this.habitaciones.push(res);
          //console.log('Resultado', res);
          //console.log('Habitaciones', this.habitaciones);
          form.resetForm();
          window.location.reload();
        } catch (error) {
          console.log('Error al agregar la habitación', error);
        }
      }
      
    );
  }

}
