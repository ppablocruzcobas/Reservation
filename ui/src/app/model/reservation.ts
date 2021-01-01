import {Contact} from './contact';

export class Reservation {
  id: string;
  description: string = '';
  date: string;
  contact: Contact = null;

  public constructor(init?: Partial<Reservation>) {
        Object.assign(this, init);
  }
}
