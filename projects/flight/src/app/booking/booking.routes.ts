import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from './feature-flight';
import { resolveFlight } from './logic-flight';
import { TicketEffects } from './logic-flight/+state/effects';
import { ticketFeature } from './logic-flight/+state/reducer';


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(ticketFeature),
        EffectsModule.forFeature([TicketEffects]),
      )
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
            /* data: {
              flight: initialFlight
            }, */
            resolve: {
              flight: resolveFlight
            }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
