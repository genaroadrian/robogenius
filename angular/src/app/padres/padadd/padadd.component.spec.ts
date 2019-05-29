import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadaddComponent } from './padadd.component';

describe('PadaddComponent', () => {
  let component: PadaddComponent;
  let fixture: ComponentFixture<PadaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
