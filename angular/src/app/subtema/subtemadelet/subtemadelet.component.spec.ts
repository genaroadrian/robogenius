import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemadeletComponent } from './subtemadelet.component';

describe('SubtemadeletComponent', () => {
  let component: SubtemadeletComponent;
  let fixture: ComponentFixture<SubtemadeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtemadeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtemadeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
