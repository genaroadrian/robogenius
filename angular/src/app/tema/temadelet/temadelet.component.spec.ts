import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemadeletComponent } from './temadelet.component';

describe('TemadeletComponent', () => {
  let component: TemadeletComponent;
  let fixture: ComponentFixture<TemadeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemadeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemadeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
