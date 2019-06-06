import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeditComponent } from './hedit.component';

describe('HeditComponent', () => {
  let component: HeditComponent;
  let fixture: ComponentFixture<HeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
