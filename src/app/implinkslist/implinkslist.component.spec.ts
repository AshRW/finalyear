import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplinkslistComponent } from './implinkslist.component';

describe('ImplinkslistComponent', () => {
  let component: ImplinkslistComponent;
  let fixture: ComponentFixture<ImplinkslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplinkslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplinkslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
