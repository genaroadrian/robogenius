import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditasisComponent } from './editasis.component';

describe('EditasisComponent', () => {
  let component: EditasisComponent;
  let fixture: ComponentFixture<EditasisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditasisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
