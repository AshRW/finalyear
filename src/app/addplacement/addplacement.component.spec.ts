import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplacementComponent } from './addplacement.component';

describe('AddplacementComponent', () => {
  let component: AddplacementComponent;
  let fixture: ComponentFixture<AddplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
