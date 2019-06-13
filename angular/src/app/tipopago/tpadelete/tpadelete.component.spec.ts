import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpadeleteComponent } from './tpadelete.component';

describe('TpadeleteComponent', () => {
  let component: TpadeleteComponent;
  let fixture: ComponentFixture<TpadeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpadeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpadeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
