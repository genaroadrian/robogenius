import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhoraaddComponent } from './personalhoraadd.component';

describe('PersonalhoraaddComponent', () => {
  let component: PersonalhoraaddComponent;
  let fixture: ComponentFixture<PersonalhoraaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalhoraaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhoraaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
