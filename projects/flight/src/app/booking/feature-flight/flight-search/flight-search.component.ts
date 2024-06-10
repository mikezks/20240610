import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FlightService } from '../../api-boarding';
import { Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  standalone: true,
  imports: [
    NgIf, NgFor, JsonPipe, AsyncPipe,
    FlightFilterComponent,
    FlightCardComponent,
    // FlightModule
  ],
  providers: [
    // FlightService
  ]
})
export class FlightSearchComponent {
  protected filter = {
    from: 'London',
    to: 'San Francisco',
    urgent: false
  };
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = of<Flight[]>([]);

  constructor(
    private flightService: FlightService
  ) {}

  protected search(filter: FlightFilter): void {
    this.filter = filter;

    if (!this.filter.from || !this.filter.to) {
      return;
    }

    this.flightService.find(this.filter.from, this.filter.to)
      .subscribe(
        flights => console.log(flights)
      );
  }

  protected delay(flight: Flight): void {
    flight;
  }

  protected reset(): void {
  }
}
