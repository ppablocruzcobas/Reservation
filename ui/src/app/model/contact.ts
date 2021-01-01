export class Contact {
  id:       string;
  name:     string = null;
  type:     string = null;
  phone:    string = null;
  birthday: string = null;

  public constructor(init?: Partial<Contact>) {
        Object.assign(this, init);
  }
}
