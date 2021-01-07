import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {ReservationComponent} from './reservation/reservation.component';

const routes: Routes = [
  {path: '', redirectTo: '/reservations', pathMatch: 'full'},
  {path: 'reservation', component: ReservationComponent},
  {path: 'reservations', component: ReservationListComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'contact/:id', component: ContactComponent},
  {path: '**', redirectTo: '/reservations'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
