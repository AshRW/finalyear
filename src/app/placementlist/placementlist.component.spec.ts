import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementlistComponent } from './placementlist.component';

describe('PlacementlistComponent', () => {
  let component: PlacementlistComponent;
  let fixture: ComponentFixture<PlacementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
