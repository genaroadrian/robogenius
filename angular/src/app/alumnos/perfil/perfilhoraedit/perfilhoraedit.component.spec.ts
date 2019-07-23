import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilhoraeditComponent } from './perfilhoraedit.component';

describe('PerfilhoraeditComponent', () => {
  let component: PerfilhoraeditComponent;
  let fixture: ComponentFixture<PerfilhoraeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilhoraeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilhoraeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
