import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChatListComponent } from './student-chat-list.component';

describe('StudentChatListComponent', () => {
  let component: StudentChatListComponent;
  let fixture: ComponentFixture<StudentChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
