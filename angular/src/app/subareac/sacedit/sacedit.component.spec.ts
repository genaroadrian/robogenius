import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaceditComponent } from './sacedit.component';

describe('SaceditComponent', () => {
  let component: SaceditComponent;
  let fixture: ComponentFixture<SaceditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaceditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
