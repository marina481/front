import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IHabitacion } from '../models/habitacion.models';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  private apiURL = 'http://localhost:3000/Habitaciones';   //ruta del backend implementado en el puerto 3000

  constructor(private _http: HttpClient) {}

  public getHabitaciones(): Observable<IHabitacion[]> {
    return this._http.get<IHabitacion[]>(`${this.apiURL}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('desde getHabitaciones() service');
        return new Observable<IHabitacion[]>();
      })
    );
  }

  public agregarHabitacion(habitacion: IHabitacion): Observable<any> {
    console.log('Agregar habitacion desde habitacionService() ' + habitacion);
    return this._http.post<IHabitacion>(`${this.apiURL}`, habitacion).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('desde agregarHabitacion() service');
        return new Observable<IHabitacion>();
      })
    );
  }
  
}
