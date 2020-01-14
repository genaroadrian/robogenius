import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhoraeditComponent } from './personalhoraedit.component';

describe('PersonalhoraeditComponent', () => {
  let component: PersonalhoraeditComponent;
  let fixture: ComponentFixture<PersonalhoraeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalhoraeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhoraeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
