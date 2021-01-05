import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['name', 'type', 'phone', 'birthday', 'actions'];
  contacts: MatTableDataSource<Contact>;

  constructor(private contactService: ContactService) {
    this.contacts = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.contactService.getAllContacts()
      .subscribe((data) => this.contacts.data = data,
        (error) => {
          console.log(error);
        });
  }

  ngAfterViewInit() {
    this.contacts.paginator = this.paginator;
    this.contacts.sort = this.sort;
  }

  onDelete(id: string) {
    this.contactService.deleteContact(id);
  }

}
