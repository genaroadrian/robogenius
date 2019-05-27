import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmeditComponent } from './tmedit.component';

describe('TmeditComponent', () => {
  let component: TmeditComponent;
  let fixture: ComponentFixture<TmeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
