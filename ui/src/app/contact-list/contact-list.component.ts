import {Component, OnInit, AfterViewInit, ViewChild, OnDestroy, Input} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  // The columns that will be displayed in the table.
  displayedColumns: string[] = ['name', 'type', 'phone', 'birthday', 'actions'];

  // The DataSource of the table.
  contactsTable: MatTableDataSource<Contact>;

  // FIXME: This is a workaround 'cause the service is not passing data at the start,
  // then I fill the data using the @Input() decorator and the service just to update.
  @Input()
  contactsData: Contact[];

  private dataSubscription: Subscription;

  constructor(private contactService: ContactService,
    private dataService: DataService) {
    this.contactsTable = new MatTableDataSource();
  }

  ngOnInit(): void {
    // Initialize the content of the table
    // (workaround for the service not firing at the beginning).
    this.contactsTable.data = this.contactsData;

    this.dataSubscription = this.dataService.notifyObservable$.subscribe((data) => {
      this.update();
    });

  }

  // Assign both Paginator and Sort to the Table.
  ngAfterViewInit() {
    this.contactsTable.paginator = this.paginator;
    this.contactsTable.sort = this.sort;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.contactService.deleteContact(id)
      .subscribe((data) => {
        let index = this.contactsTable.data.findIndex(x => x.id == id);
        this.contactsTable.data.splice(index, 1);

        // Refresh the content.
        this.update();
      },
        (error) => {
          console.log(error);
        });
  }

  update() {
    this.contactsTable.data = this.contactsData;
  }

}
