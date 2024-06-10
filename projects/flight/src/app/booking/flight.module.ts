import { NgModule } from "@angular/core";
import { FlightService } from "./api-boarding";


@NgModule({
  providers: [
    FlightService
  ]
})
export class FlightModule {}
