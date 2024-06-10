import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class FlightEditComponent implements OnChanges {
  private formBuilder = inject(FormBuilder);

  @Input() flight = initialFlight;

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

    // this.editForm.reset();
    /* this.editForm.patchValue({
      from: ''
    });
    this.editForm.getRawValue() */
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
