import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>("/api/contacts");
  }

  findContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>("api/contact/" + id);
  }

  updateContact(contact: Contact): Observable<Contact> {
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<Contact>("/api/contact", contact, options);
  }

  createContact(contact: Contact): Observable<Contact> {
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Contact>("/api/contact", contact, options);
  }

  deleteContact(id: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.delete("/api/contact/" + id, options);
  }

}
