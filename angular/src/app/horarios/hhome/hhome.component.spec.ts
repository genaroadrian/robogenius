import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HhomeComponent } from './hhome.component';

describe('HhomeComponent', () => {
  let component: HhomeComponent;
  let fixture: ComponentFixture<HhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
