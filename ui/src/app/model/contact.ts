export class Contact {
  id: number;
  name: string = null;
  type: string = null;
  phone: string = null;
  birthday: Date = null;

  public constructor(init?: Partial<Contact>) {
        Object.assign(this, init);
  }
}
