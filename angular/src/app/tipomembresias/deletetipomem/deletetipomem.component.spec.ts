import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetipomemComponent } from './deletetipomem.component';

describe('DeletetipomemComponent', () => {
  let component: DeletetipomemComponent;
  let fixture: ComponentFixture<DeletetipomemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetipomemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetipomemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
