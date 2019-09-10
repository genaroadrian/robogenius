import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodmodificarComponent } from './codmodificar.component';

describe('CodmodificarComponent', () => {
  let component: CodmodificarComponent;
  let fixture: ComponentFixture<CodmodificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodmodificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
