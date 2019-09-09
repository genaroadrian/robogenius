import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaeditComponent } from './temaedit.component';

describe('TemaeditComponent', () => {
  let component: TemaeditComponent;
  let fixture: ComponentFixture<TemaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
