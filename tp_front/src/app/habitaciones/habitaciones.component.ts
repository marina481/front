import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface IHabitacion {
  title: string;
  price: number;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})

export class HabitacionesComponent {
  // Array para almacenar las habitaciones
  bedrooms: IHabitacion[] = [];

  // Objeto para capturar la nueva habitación
  newRoom: IHabitacion = {
    title: '',
    price: 0,
    description: '',
    images: [] as string[]
  };

  // Método para agregar una nueva habitación
  agregarHabitacion() {
    // Validación para asegurarse de que todos los campos estén completos
    if (this.newRoom.title && this.newRoom.price > 0 && this.newRoom.description && this.newRoom.images.length > 0) {
      // Usamos spread operator para hacer una copia del objeto antes de agregarlo
      this.bedrooms.push({ ...this.newRoom });  // Se hace una copia para evitar efectos secundarios
      this.limpiarFormulario();  // Limpiar el formulario después de agregar
      alert('Habitación agregada exitosamente');
    } else {
      alert('Debe ingresar todos los datos correctamente');
    }
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.newRoom = { title: '', price: 0, description: '', images: [] };  // Reiniciar el objeto de la habitación
  }

  // Método para manejar el cambio de imagen
  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);  // Convertir FileList a array
      this.newRoom.images = files.map(file => URL.createObjectURL(file));  // Crear URLs para las imágenes seleccionadas
    }
  }
}
