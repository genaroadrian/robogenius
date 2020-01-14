import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhoradeleteComponent } from './personalhoradelete.component';

describe('PersonalhoradeleteComponent', () => {
  let component: PersonalhoradeleteComponent;
  let fixture: ComponentFixture<PersonalhoradeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalhoradeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhoradeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
