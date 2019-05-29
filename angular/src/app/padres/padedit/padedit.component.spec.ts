import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadeditComponent } from './padedit.component';

describe('PadeditComponent', () => {
  let component: PadeditComponent;
  let fixture: ComponentFixture<PadeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
