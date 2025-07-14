import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowersOfTwoExerciseComponent } from './powers-of-two-exercise.component';

describe('PowersOfTwoExerciseComponent', () => {
  let component: PowersOfTwoExerciseComponent;
  let fixture: ComponentFixture<PowersOfTwoExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowersOfTwoExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowersOfTwoExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
