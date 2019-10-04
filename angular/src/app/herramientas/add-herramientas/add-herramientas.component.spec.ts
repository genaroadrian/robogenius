import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHerramientasComponent } from './add-herramientas.component';

describe('AddHerramientasComponent', () => {
  let component: AddHerramientasComponent;
  let fixture: ComponentFixture<AddHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
