import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaradComponent } from './modificarad.component';

describe('ModificaradComponent', () => {
  let component: ModificaradComponent;
  let fixture: ComponentFixture<ModificaradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
