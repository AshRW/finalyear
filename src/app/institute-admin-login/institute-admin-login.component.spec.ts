import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteAdminLoginComponent } from './institute-admin-login.component';

describe('InstituteAdminLoginComponent', () => {
  let component: InstituteAdminLoginComponent;
  let fixture: ComponentFixture<InstituteAdminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteAdminLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
