import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';
import {Reservation} from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>("/api/reservations");
  }

  findReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>("api/reservation/" + id);
  }

  createReservation(reservation: Reservation): Observable<Contact> {
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Contact>("/api/reservation", reservation, options);
  }

  updateReservation(reservation: Reservation): Observable<Contact> {
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<Contact>("/api/reservation", reservation, options);
  }

}
