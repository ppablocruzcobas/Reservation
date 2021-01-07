import {Contact} from './contact';

export class Reservation {
  id: string;
  description: string = null;
  date: Date = new Date();
  contact: Contact = null;
  stars: number;
  favorite: boolean;

  public constructor(init?: Partial<Reservation>) {
    Object.assign(this, init);
  }
}
