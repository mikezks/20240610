import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlightBookingComponent, FlightEditComponent } from './feature-flight';
import { TicketEffects } from './logic-flight/+state/effects';
import { ticketFeature } from './logic-flight/+state/reducer';
import { UiFlightModule } from './ui-flight/ui-flight.module';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [

        UiFlightModule,
        FlightBookingComponent,
        FlightEditComponent
    ]
})
export class BookingModule { }
