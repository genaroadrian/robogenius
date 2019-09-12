import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilhoradeleteComponent } from './perfilhoradelete.component';

describe('PerfilhoradeleteComponent', () => {
  let component: PerfilhoradeleteComponent;
  let fixture: ComponentFixture<PerfilhoradeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilhoradeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilhoradeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
