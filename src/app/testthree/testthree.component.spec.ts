import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestthreeComponent } from './testthree.component';

describe('TestthreeComponent', () => {
  let component: TestthreeComponent;
  let fixture: ComponentFixture<TestthreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestthreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
