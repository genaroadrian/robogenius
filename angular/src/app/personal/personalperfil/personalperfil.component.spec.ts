import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalperfilComponent } from './personalperfil.component';

describe('PersonalperfilComponent', () => {
  let component: PersonalperfilComponent;
  let fixture: ComponentFixture<PersonalperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
