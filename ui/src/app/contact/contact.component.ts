import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';
import {TYPECONTACT} from '../model/type';

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

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.contactService.findContactById(params['id'])
        .subscribe((data) => {
          this.contact = data;
          this.formContact.patchValue(this.contact)
        },
          (error) => {
            console.log(error);
          });
    });
  }

  onContactSubmit() {
    let contact = new Contact(this.formContact.value);
    if (this.contact) {
      contact.id = this.contact.id;
      this.contactService.updateContact(contact);
    } else {
      this.contactService.createContact(contact)
        .subscribe((data) => this.contact = data,
          (error) => {
            console.log(error);
          });
    }
    this.formContact.reset();
  }

}
