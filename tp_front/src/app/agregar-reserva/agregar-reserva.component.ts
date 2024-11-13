import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  volver () {
    // TODO
  }

  enviarReserva () {
    // TODO
  }

}
