import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
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

  contactsTable: MatTableDataSource<Contact>;

  @Input()
  contactsData: Contact[];

  constructor(private contactService: ContactService) {
    this.contactsTable = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.contactsTable.data = this.contactsData;
  }

  ngAfterViewInit() {
    this.contactsTable.paginator = this.paginator;
    this.contactsTable.sort = this.sort;
  }

  onDelete(id: string) {
    this.contactService.deleteContact(id)
      .subscribe((data) => {
        let index = this.contactsData.findIndex(x => x.id == id);
        this.contactsData.splice(index, 1);
        this.update();
      },
        (error) => {
          console.log(error);
        });
  }

  update() {
    // FIXME: It's not the correct way of update the data.
    this.contactsTable.data = this.contactsData;
  }

}
