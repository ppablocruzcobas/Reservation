import {Contact} from './contact';

export class Reservation {
  id: string;
  description: string;
  date: string;
  contact: Contact;

  public constructor(init?: Partial<Reservation>) {
        Object.assign(this, init);
  }
}
