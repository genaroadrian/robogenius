import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DceditComponent } from './dcedit.component';

describe('DceditComponent', () => {
  let component: DceditComponent;
  let fixture: ComponentFixture<DceditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DceditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
