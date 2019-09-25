import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChatListComponent } from './teacher-chat-list.component';

describe('TeacherChatListComponent', () => {
  let component: TeacherChatListComponent;
  let fixture: ComponentFixture<TeacherChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
