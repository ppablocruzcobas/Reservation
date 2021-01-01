import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Contact } from '../model/contact';
import { ContactService } from '../service/contact.service';
import { TYPECONTACT } from '../model/type';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl()
  });

  contact: Contact;
  typeContact = TYPECONTACT;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  onContactSubmit() {
    let contact = new Contact(this.formContact.value);
    this.contactService.createContact(contact)
        .subscribe((data) => this.contact = data,
                   (error) => {
                     console.log(error);
                   });
    this.formContact.reset();
  }
}
