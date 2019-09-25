import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMoodleComponent } from './student-moodle.component';

describe('StudentMoodleComponent', () => {
  let component: StudentMoodleComponent;
  let fixture: ComponentFixture<StudentMoodleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMoodleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMoodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
