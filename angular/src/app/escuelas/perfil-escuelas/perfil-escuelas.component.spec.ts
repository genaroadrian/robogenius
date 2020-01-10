import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEscuelasComponent } from './perfil-escuelas.component';

describe('PerfilEscuelasComponent', () => {
  let component: PerfilEscuelasComponent;
  let fixture: ComponentFixture<PerfilEscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
