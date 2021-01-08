import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * Service used to tell a child component it must update.
 *
 * @export
 * @class DataService
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private notify = new Subject<any>();

  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor() {}

  public update() {
    this.notify.next();
  }

}
