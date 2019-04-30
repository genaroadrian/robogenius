import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEscuelasComponent } from './form-escuelas.component';

describe('FormEscuelasComponent', () => {
  let component: FormEscuelasComponent;
  let fixture: ComponentFixture<FormEscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
