import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaddComponent } from './tpadd.component';

describe('TpaddComponent', () => {
  let component: TpaddComponent;
  let fixture: ComponentFixture<TpaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
