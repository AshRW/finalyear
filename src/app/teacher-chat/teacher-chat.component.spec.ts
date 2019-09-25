import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChatComponent } from './teacher-chat.component';

describe('TeacherChatComponent', () => {
  let component: TeacherChatComponent;
  let fixture: ComponentFixture<TeacherChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
