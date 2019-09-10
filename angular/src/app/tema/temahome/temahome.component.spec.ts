import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemahomeComponent } from './temahome.component';

describe('TemahomeComponent', () => {
  let component: TemahomeComponent;
  let fixture: ComponentFixture<TemahomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemahomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
