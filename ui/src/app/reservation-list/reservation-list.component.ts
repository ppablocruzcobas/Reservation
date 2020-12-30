import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../model/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];
  msg: string;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations()
        .subscribe((data) => this.reservations = data,
                   (error) => {
                      this.msg = "Problem with service";
                   });
  }

}
