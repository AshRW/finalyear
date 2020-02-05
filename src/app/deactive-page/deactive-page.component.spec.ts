import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivePageComponent } from './deactive-page.component';

describe('DeactivePageComponent', () => {
  let component: DeactivePageComponent;
  let fixture: ComponentFixture<DeactivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
