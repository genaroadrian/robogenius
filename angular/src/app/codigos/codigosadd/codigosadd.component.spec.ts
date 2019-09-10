import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigosaddComponent } from './codigosadd.component';

describe('CodigosaddComponent', () => {
  let component: CodigosaddComponent;
  let fixture: ComponentFixture<CodigosaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigosaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigosaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
