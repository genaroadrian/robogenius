import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveperComponent } from './inactiveper.component';

describe('InactiveperComponent', () => {
  let component: InactiveperComponent;
  let fixture: ComponentFixture<InactiveperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
