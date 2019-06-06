import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaddComponent } from './hadd.component';

describe('HaddComponent', () => {
  let component: HaddComponent;
  let fixture: ComponentFixture<HaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
