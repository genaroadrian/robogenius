import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreadeletComponent } from './areadelet.component';

describe('AreadeletComponent', () => {
  let component: AreadeletComponent;
  let fixture: ComponentFixture<AreadeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreadeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreadeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
