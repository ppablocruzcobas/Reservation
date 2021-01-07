import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Contact} from '../model/contact';
import {ContactService} from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: '../contact/contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required)
  });

  contact: Contact;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != undefined) {
        this.contactService.findContactById(params['id'])
          .subscribe((data) => {
            this.contact = data;
            this.formContact.patchValue(this.contact);
          },
            (error) => {
              console.log(error);
            });
      }
    });
  }

  onContactSubmit() {
    if (this.formContact.valid) {
      let contact = new Contact(this.formContact.value);

      if (this.contact) {
        contact.id = this.contact.id;
        this.contactService.updateContact(contact).
          subscribe((data) => {
            this.formContact.reset();
          },
            (error) => {
              console.log(error);
            })
      } else {
        this.contactService.createContact(contact)
          .subscribe((data) => {
            this.formContact.reset();
          },
            (error) => {
              console.log(error);
            });
      }
    }
  }

}
