import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtipomemComponent } from './addtipomem.component';

describe('AddtipomemComponent', () => {
  let component: AddtipomemComponent;
  let fixture: ComponentFixture<AddtipomemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtipomemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtipomemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
