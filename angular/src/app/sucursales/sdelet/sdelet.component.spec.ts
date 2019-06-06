import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdeletComponent } from './sdelet.component';

describe('SdeletComponent', () => {
  let component: SdeletComponent;
  let fixture: ComponentFixture<SdeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
