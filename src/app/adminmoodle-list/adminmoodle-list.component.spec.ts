import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmoodleListComponent } from './adminmoodle-list.component';

describe('AdminmoodleListComponent', () => {
  let component: AdminmoodleListComponent;
  let fixture: ComponentFixture<AdminmoodleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmoodleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmoodleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
