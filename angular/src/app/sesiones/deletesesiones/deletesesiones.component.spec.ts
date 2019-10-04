import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesesionesComponent } from './deletesesiones.component';

describe('DeletesesionesComponent', () => {
  let component: DeletesesionesComponent;
  let fixture: ComponentFixture<DeletesesionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesesionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
