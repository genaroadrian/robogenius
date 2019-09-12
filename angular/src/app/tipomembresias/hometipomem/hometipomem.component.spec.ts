import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometipomemComponent } from './hometipomem.component';

describe('HometipomemComponent', () => {
  let component: HometipomemComponent;
  let fixture: ComponentFixture<HometipomemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometipomemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometipomemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
