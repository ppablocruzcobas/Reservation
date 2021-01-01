import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../model/reservation';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['contact', 'description', 'date'];
  reservations: MatTableDataSource<Reservation>;

  constructor(private reservationService: ReservationService) {
    this.reservations = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.reservationService.getAllReservations()
        .subscribe((data) => this.reservations.data = data,
                   (error) => {
                     console.log(error);
                   });
  }

  ngAfterViewInit() {
    this.reservations.paginator = this.paginator;
    this.reservations.sort = this.sort;
  }

}
