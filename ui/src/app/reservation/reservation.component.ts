import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Contact} from '../model/contact';
import {Reservation} from '../model/reservation';
import {ContactService} from '../service/contact.service';
import {ReservationService} from '../service/reservation.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ContactListComponent} from '../contact-list/contact-list.component';

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

  contacts: Contact[];
  contact: Contact;
  reservation: Reservation;

  contactListVisible = false;

  @ViewChild('contactList')
  private contactList: ContactListComponent;

  constructor(private route: ActivatedRoute,
    private reservationService: ReservationService,
    private contactService: ContactService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != undefined) {
        this.reservationService.findReservationById(params['id'])
          .subscribe((data) => {
            this.reservation = data;
            this.contact = this.reservation.contact;
            this.formReservation.patchValue(this.reservation);
          },
            (error) => {
              console.log(error);
            });
      }
    });

    this.contactService.getAllContacts()
      .subscribe((data) => {
        this.contacts = data;

        this.formContact.get('name').valueChanges
          .subscribe((value) => {
            this.onContactNameInput(value);
          });
      },
        (error) => {
          console.log(error);
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
    if (this.formContact.valid) {
      let reservation = new Reservation(this.formReservation.value);

      if (this.reservation) { // Updating...
        reservation.id = this.reservation.id;
        reservation.contact.id = this.reservation.contact.id;

        this.reservationService.updateReservation(reservation)
          .subscribe((data) => {
            this.contact = this.contacts.find(x => x.id == reservation.contact.id);
            let index = this.contacts.indexOf(this.contact);
            this.contacts[index] = data;
            this.reset();
          },
            (error) => {
              console.log(error);
            })
      } else { // Creating...

        if (this.contact) { // Assigning to existing contact...
          reservation.contact = this.contact;
        }

        // Otherwise create both contact and reservation...
        this.reservationService.createReservation(reservation)
          .subscribe((data) => {
            this.contacts.push(data);
            this.reset();
          },
            (error) => {
              console.log(error);
            });
      }
    }
  }

  reset() {
    // Fire event to update list
    this.contactList.update();

    this.formReservation.reset();
    this.contact = null;
  }

}
