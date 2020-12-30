import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../model/contact';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  msg: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts()
        .subscribe((data) => this.contacts = data,
                   (error) => {
                      this.msg = "Problem with service";
                   });
  }

}
