export class Contact {
  id: string;
  name: string = '';
  type: string = '';
  phone: string = '';
  birthday: string = '';

  public constructor(init?: Partial<Contact>) {
        Object.assign(this, init);
  }
}
