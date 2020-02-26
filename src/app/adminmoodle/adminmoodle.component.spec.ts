import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmoodleComponent } from './adminmoodle.component';

describe('AdminmoodleComponent', () => {
  let component: AdminmoodleComponent;
  let fixture: ComponentFixture<AdminmoodleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmoodleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmoodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
