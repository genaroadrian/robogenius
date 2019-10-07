import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsesionesComponent } from './addsesiones.component';

describe('AddsesionesComponent', () => {
  let component: AddsesionesComponent;
  let fixture: ComponentFixture<AddsesionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsesionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
