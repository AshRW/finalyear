import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhighlightComponent } from './addhighlight.component';

describe('AddhighlightComponent', () => {
  let component: AddhighlightComponent;
  let fixture: ComponentFixture<AddhighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
