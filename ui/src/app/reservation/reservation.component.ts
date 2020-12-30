import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact } from '../model/contact';
import { Reservation } from '../model/reservation';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  formContact = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl()
  });

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
  }

  onContactNameInput() {
  }

  onReservationSubmit() {
    let contact = new Contact(this.formContact.value);
    let reservation = new Reservation(contact);
    reservation.description = "";

    this.reservationService.createReservation(reservation);

    this.formContact.reset();
  }
}
