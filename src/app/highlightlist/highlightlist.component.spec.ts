import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightlistComponent } from './highlightlist.component';

describe('HighlightlistComponent', () => {
  let component: HighlightlistComponent;
  let fixture: ComponentFixture<HighlightlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
