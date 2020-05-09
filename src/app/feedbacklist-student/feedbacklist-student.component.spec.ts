import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacklistStudentComponent } from './feedbacklist-student.component';

describe('FeedbacklistStudentComponent', () => {
  let component: FeedbacklistStudentComponent;
  let fixture: ComponentFixture<FeedbacklistStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacklistStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacklistStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
