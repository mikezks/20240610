import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Injector, inject, runInInjectionContext } from '@angular/core';
import { Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { TicketsFacade } from './../../logic-flight/+state/facade';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';


export function injectTicketFacade() {
  return inject(TicketsFacade);
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  standalone: true,
  imports: [
    NgIf, NgFor, JsonPipe, AsyncPipe,
    FlightFilterComponent,
    FlightCardComponent
  ]
})
export class FlightSearchComponent {
  private injector = inject(Injector);
  private ticketsFacade = injectTicketFacade();

  protected filter = {
    from: 'London',
    to: 'San Francisco',
    urgent: false
  };
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  protected search(filter: FlightFilter): void {
    this.injector.get(TicketsFacade);

    const facade = runInInjectionContext(
      this.injector,
      () => injectTicketFacade()
    );

    this.filter = filter;

    if (!this.filter.from || !this.filter.to) {
      return;
    }

    this.ticketsFacade.search(this.filter);
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
