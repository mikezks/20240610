import { NgModule } from '@angular/core';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';


@NgModule({
    imports: [
        FlightCardComponent,
        FlightFilterComponent
    ],
    exports: [
        FlightCardComponent,
        FlightFilterComponent
    ]
})
export class UiFlightModule { }
