import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reserva } from '../models/reserva.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-reserva.component.html',
  styleUrl: './agregar-reserva.component.css'
})
export class AgregarReservaComponent {

  reservaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    habitacion: new FormControl('', [Validators.required, Validators.min(0)]),
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required])
  })

  constructor (private _backservice: ApiService, private _router: Router) {}

  // Vuelve al calendario
  volver () {
    this._router.navigate(['/Calendario']);
  }

  // Envía la reserva a la base de datos y vuelve al calendario
  enviarReserva () {
    if (this.reservaForm.valid) {
      const nuevaReserva = this.reservaForm.value as Reserva;
      console.log("Reserva: ")
      console.log(nuevaReserva);
      this._backservice.agregarReserva(nuevaReserva).subscribe((response) => {
        console.log(response)
      })
    }
  }
}
