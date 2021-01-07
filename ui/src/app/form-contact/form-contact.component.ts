import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TYPECONTACT} from '../model/type';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css'],
})
export class FormContactComponent implements OnInit {

  @Input()
  formContact = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    phone: new FormControl(),
    birthday: new FormControl()
  });

  typeContact = TYPECONTACT;

  constructor() {}

  ngOnInit(): void {
  }

}
