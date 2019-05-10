import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TphomeComponent } from './tphome.component';

describe('TphomeComponent', () => {
  let component: TphomeComponent;
  let fixture: ComponentFixture<TphomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TphomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
