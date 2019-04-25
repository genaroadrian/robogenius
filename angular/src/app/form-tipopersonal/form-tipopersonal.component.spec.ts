import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipopersonalComponent } from './form-tipopersonal.component';

describe('FormTipopersonalComponent', () => {
  let component: FormTipopersonalComponent;
  let fixture: ComponentFixture<FormTipopersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTipopersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipopersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
