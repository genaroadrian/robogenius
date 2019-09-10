import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnivelComponent } from './addnivel.component';

describe('AddnivelComponent', () => {
  let component: AddnivelComponent;
  let fixture: ComponentFixture<AddnivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
