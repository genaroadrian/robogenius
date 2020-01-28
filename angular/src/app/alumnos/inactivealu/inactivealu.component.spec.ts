import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivealuComponent } from './inactivealu.component';

describe('InactivealuComponent', () => {
  let component: InactivealuComponent;
  let fixture: ComponentFixture<InactivealuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivealuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivealuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
