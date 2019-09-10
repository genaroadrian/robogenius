import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigohomeComponent } from './codigohome.component';

describe('CodigohomeComponent', () => {
  let component: CodigohomeComponent;
  let fixture: ComponentFixture<CodigohomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigohomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
