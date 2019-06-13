import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaeditComponent } from './tpaedit.component';

describe('TpaeditComponent', () => {
  let component: TpaeditComponent;
  let fixture: ComponentFixture<TpaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
