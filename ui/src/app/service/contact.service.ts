import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>("/api/contacts");
  }

  findContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>("api/contact/" + id);
  }

  updateContact(contact: Contact) {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.put("/api/contact", contact, options)
        .subscribe((error) => {
                    console.log(error);
                  });
  }

  createContact(contact: Contact): Observable<Contact> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Contact>("/api/contact", contact, options);
  }

  deleteContact(id: string) {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.delete("/api/contact/" + id, options)
        .subscribe((error) => {
                    console.log(error);
                  });
  }

}
