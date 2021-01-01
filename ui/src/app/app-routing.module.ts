import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  { path: '', redirectTo: '/reservations', pathMatch: 'full' },
  { path: 'reservation', component: ReservationComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'contact/:id', component: ContactComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: '**', redirectTo: '/reservations'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
