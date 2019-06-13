import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpahomeComponent } from './tpahome.component';

describe('TpahomeComponent', () => {
  let component: TpahomeComponent;
  let fixture: ComponentFixture<TpahomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpahomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
