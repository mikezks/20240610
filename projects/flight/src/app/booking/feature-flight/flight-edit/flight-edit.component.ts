import { Component, Input, OnChanges, SimpleChanges, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { Flight, initialFlight } from '../../logic-flight';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class FlightEditComponent {
  private formBuilder = inject(FormBuilder);

  flight = input.required<Flight>()

  protected editForm = this.formBuilder.nonNullable.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor(
    private store: Store
  ) {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    effect(
      () => this.editForm.patchValue(this.flight())
    );
  }


  protected save(): void {
    console.log(this.editForm.value);
  }
}
