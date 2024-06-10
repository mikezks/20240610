import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from './feature-flight';
import { FlightResolver } from './logic-flight';
import { ticketFeature } from './logic-flight/+state/reducer';
import { FlightService } from './logic-flight/data-access/flight.service';


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(ticketFeature),
        // EffectsModule.forFeature([TicketEffects]),
      ),
      FlightService
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flight: FlightResolver
            }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
