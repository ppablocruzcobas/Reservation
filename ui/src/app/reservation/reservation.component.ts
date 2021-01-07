import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Contact} from '../model/contact';
import {Reservation} from '../model/reservation';
import {ContactService} from '../service/contact.service';
import {ReservationService} from '../service/reservation.service';
import {TYPECONTACT} from '../model/type';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  formContact = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required)
  });

  formReservation = new FormGroup({
    contact: this.formContact,
    description: new FormControl()
  });

  contact: Contact;
  contacts: Contact[];

  typeContact = TYPECONTACT;

  contactListVisible = false;

  constructor(private reservationService: ReservationService,
    private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAllContacts()
      .subscribe((data) => this.contacts = data,
        (error) => {
          console.log(error);
        });
    this.formContact.get('name').valueChanges
      .subscribe((value) => {
        this.onContactNameInput(value);
      });
  }

  onContactNameInput(name: string) {
    this.contact = this.contacts.find(x => x.name == name);
    if (this.contact != undefined) {
      this.formContact.get('type').setValue(this.contact.type);
      this.formContact.get('phone').setValue(this.contact.phone);
      this.formContact.get('birthday').setValue(this.contact.birthday);
    }
  }

  onShowContactList() {
    this.contactListVisible = !this.contactListVisible;
  }

  onReservationSubmit() {
    console.log(this.formReservation.get('description').value);
    if (this.formContact.valid) {
      let reservation = new Reservation(this.formReservation.value);
      if (this.contact) {
        reservation.contact.id = this.contact.id;
      }
      this.reservationService.createReservation(reservation)
        .subscribe((data) => {
          this.contacts.push(data);
          this.formReservation.reset();
        },
          (error) => {
            console.log(error);
          });
    }
  }

}
