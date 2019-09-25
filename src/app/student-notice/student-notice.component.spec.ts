import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNoticeComponent } from './student-notice.component';

describe('StudentNoticeComponent', () => {
  let component: StudentNoticeComponent;
  let fixture: ComponentFixture<StudentNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
