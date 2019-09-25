import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgradosComponent } from './addgrados.component';

describe('AddgradosComponent', () => {
  let component: AddgradosComponent;
  let fixture: ComponentFixture<AddgradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
