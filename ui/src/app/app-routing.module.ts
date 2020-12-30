import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/reservations', pathMatch: 'full' },
  { path: 'reservation', component: ReservationComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
