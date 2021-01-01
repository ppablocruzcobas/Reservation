import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact } from '../model/contact';
import { Reservation } from '../model/reservation';
import { ContactService } from '../service/contact.service';
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

  formReservation = new FormGroup({
    contact: this.formContact,
    description: new FormControl()
  });

  contacts: Contact[];

  constructor(private reservationService: ReservationService,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts()
        .subscribe((data) => this.contacts = data);
  }

  onContactNameInput(event: any) {
    let contact = this.contacts.find(x => x.name == event.target.value);
    if (contact != undefined) {
      this.formContact.patchValue(contact);
    } else {
      this.formContact.setValue(new Contact({name: event.target.value}));
    }
  }

  onReservationSubmit() {
    let reservation = new Reservation(this.formReservation.value);

    this.reservationService.createReservation(reservation);

    this.reset();
  }

  reset() {
    this.formReservation.reset();
  }

}
