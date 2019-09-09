import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemaaddComponent } from './subtemaadd.component';

describe('SubtemaaddComponent', () => {
  let component: SubtemaaddComponent;
  let fixture: ComponentFixture<SubtemaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtemaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtemaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
