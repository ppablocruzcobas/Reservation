import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Contact} from '../model/contact';
import {Reservation} from '../model/reservation';
import {ContactService} from '../service/contact.service';
import {ReservationService} from '../service/reservation.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  // Top Banner variables...
  gotoLink: string = "/reservations";
  gotoName: string = "Reservations List";
  pageName: string = "Create Reservation";
  gotoIcon: any = ''

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

  // The Contact list, is shared with ContactListComponent.
  contacts: Contact[];

  contact: Contact;
  reservation: Reservation;

  // When loaded, the contact list is hidden until user decide to show it.
  contactListVisible = false;

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private reservationService: ReservationService,
    private contactService: ContactService) {
  }

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

        // Subscribe to value changes in the name.
        this.formContact.get('name').valueChanges
          .subscribe((value) => {
            this.onContactNameInput(value);
          });
      },
        (error) => {
          console.log(error);
        });
  }

  /**
   * If an existing Contact is found, fill the others field.
   * IMPORTANT!!!: Note that I don't reset the others field when there is not match,
   * which allow to change the name while remaining others field untouched, but this means
   * that when submiting a new contact will be created (view submit implementation below).
   *
   * @param {string} name
   * @memberof ReservationComponent
   */
  onContactNameInput(name: string) {
    this.contact = this.contacts.find(x => x.name == name);
    if (this.contact != undefined) {
      this.formContact.get('type').setValue(this.contact.type);
      this.formContact.get('phone').setValue(this.contact.phone);
      this.formContact.get('birthday').setValue(this.contact.birthday);
    }
  }

  // Show the Contact List and also disable the button (in the View).
  onShowContactList() {
    this.contactListVisible = !this.contactListVisible;
  }

  onReservationSubmit() {
    if (this.formContact.valid) {
      let reservation = new Reservation(this.formReservation.value);

      if (this.reservation) { // Updating...
        reservation.id = this.reservation.id;
        reservation.contact.id = this.reservation.contact.id;
        reservation.stars = this.reservation.stars;
        reservation.favorite = this.reservation.favorite;

        this.reservationService.updateReservation(reservation)
          .subscribe((data) => {
            // Find the index and update info in the Table,
            // this way I don't have to refresh or consume the API again.
            this.contact = this.contacts.find(x => x.id == reservation.contact.id);
            let index = this.contacts.indexOf(this.contact);
            this.contacts[index] = data;
            this.updateAndReset();
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
            // Update the Table with the info of the Contact created.
            this.contacts.push(data);
            this.updateAndReset();
          },
            (error) => {
              console.log(error);
            });
      }
    }
  }

  updateAndReset() {
    this.dataService.update();

    this.formReservation.reset();
    this.contact = null;
  }

}
