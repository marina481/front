import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "http://localhost:3000/Reservas"

  constructor(private _http:HttpClient) { }

  public getReservas():Observable<Reserva[]> {
    return this._http.get<Reserva[]>(this.apiURL)
  }

  public agregarReserva(reserva: Reserva): Observable <Reserva> {
    return this._http.post<Reserva>(this.apiURL, reserva);
  }
}
