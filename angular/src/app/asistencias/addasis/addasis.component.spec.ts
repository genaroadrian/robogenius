import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddasisComponent } from './addasis.component';

describe('AddasisComponent', () => {
  let component: AddasisComponent;
  let fixture: ComponentFixture<AddasisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddasisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
