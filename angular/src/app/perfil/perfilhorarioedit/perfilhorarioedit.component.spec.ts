import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilhorarioeditComponent } from './perfilhorarioedit.component';

describe('PerfilhorarioeditComponent', () => {
  let component: PerfilhorarioeditComponent;
  let fixture: ComponentFixture<PerfilhorarioeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilhorarioeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilhorarioeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
