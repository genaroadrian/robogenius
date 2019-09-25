import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiladdhoraComponent } from './perfiladdhora.component';

describe('PerfiladdhoraComponent', () => {
  let component: PerfiladdhoraComponent;
  let fixture: ComponentFixture<PerfiladdhoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiladdhoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiladdhoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
