import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>("/api/reservations");
  }

  createReservation(reservation: Reservation) {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<string>("/api/reservation", reservation, options)
        .subscribe((error) => {
          console.log(error);
        });
  }
}
