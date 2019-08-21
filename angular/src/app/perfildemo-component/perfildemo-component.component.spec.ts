import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfildemoComponentComponent } from './perfildemo-component.component';

describe('PerfildemoComponentComponent', () => {
  let component: PerfildemoComponentComponent;
  let fixture: ComponentFixture<PerfildemoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfildemoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfildemoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
