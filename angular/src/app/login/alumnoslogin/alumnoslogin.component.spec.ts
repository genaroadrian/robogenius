import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosloginComponent } from './alumnoslogin.component';

describe('AlumnosloginComponent', () => {
  let component: AlumnosloginComponent;
  let fixture: ComponentFixture<AlumnosloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
