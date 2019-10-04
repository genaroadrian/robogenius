import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesesionesComponent } from './homesesiones.component';

describe('HomesesionesComponent', () => {
  let component: HomesesionesComponent;
  let fixture: ComponentFixture<HomesesionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesesionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
