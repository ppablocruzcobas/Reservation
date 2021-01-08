import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../service/reservation.service';
import {Reservation} from '../model/reservation';
import {ORDERBY} from '../model/order';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  // Used to fill the sort selector in the View.
  sortBy = ORDERBY;

  // Used to monitor the value of the selected order in the View.
  selectValue: any;

  // Top Banner variables.
  gotoLink: string = "/reservation";
  gotoName: string = "Create Reservation";
  pageName: string = "Reservations List";
  gotoIcon: string = ''

  reservations: Reservation[];

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    // Get the list of reservations from the API service.
    this.reservationService.getAllReservations()
      .subscribe((data) => this.reservations = data,
        (error) => {
          console.log(error);
        });
  }

  /**
   * Called when change on selection order to re-sort the list.
   *
   * @param {*} event
   * @memberof ReservationListComponent
   */
  onSortChanged(sort: any) {
    if (sort.field != 'contact') {
      this.reservations.sort((a, b) =>
        a[sort.field] < b[sort.field] ? sort.direction :
          a[sort.field] > b[sort.field] ? -sort.direction : 0);
    } else {
      this.reservations.sort((a, b) =>
        a.contact.name < b.contact.name ? sort.direction :
          a.contact.name > b.contact.name ? -sort.direction : 0);
    }
  }

  /**
   * Update the reservation ranking. 
   *
   * @param {*} ranking
   * @param {Reservation} reservation
   * @memberof ReservationListComponent
   */
  onRatingClick(ranking: any, reservation: Reservation) {
    reservation.stars = ranking;

    this.reservationService.updateReservation(reservation)
      .subscribe((data) => {
        let index = this.reservations.findIndex(x => x.id == reservation.id);
        this.reservations[index].stars = reservation.stars;

        // If ranking is selected for ordering, then refresh the list. 
        if (this.selectValue) {
          if (this.selectValue.field == 'stars') {
            this.onSortChanged(this.selectValue);
          }
        }
      },
        (error) => {
          console.log(error);
        });
  }

  /**
   * Change favorite status to !favorite.
   *
   * @param {Reservation} reservation
   * @memberof ReservationListComponent
   */
  onFavoriteClick(reservation: Reservation) {
    reservation.favorite = !reservation.favorite;

    this.reservationService.updateReservation(reservation)
      .subscribe((data) => {
        let index = this.reservations.findIndex(x => x.id == reservation.id);
        this.reservations[index].favorite = reservation.favorite;
      },
        (error) => {
          console.log(error);
        });
  }

}
