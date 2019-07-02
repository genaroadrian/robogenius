import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemalumnovistaComponent } from './memalumnovista.component';

describe('MemalumnovistaComponent', () => {
  let component: MemalumnovistaComponent;
  let fixture: ComponentFixture<MemalumnovistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemalumnovistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemalumnovistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
