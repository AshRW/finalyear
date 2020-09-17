import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddimplinksComponent } from './addimplinks.component';

describe('AddimplinksComponent', () => {
  let component: AddimplinksComponent;
  let fixture: ComponentFixture<AddimplinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddimplinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddimplinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
