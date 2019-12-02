import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloescuelasComponent } from './moduloescuelas.component';

describe('ModuloescuelasComponent', () => {
  let component: ModuloescuelasComponent;
  let fixture: ComponentFixture<ModuloescuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloescuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloescuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
