import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsesionesComponent } from './editsesiones.component';

describe('EditsesionesComponent', () => {
  let component: EditsesionesComponent;
  let fixture: ComponentFixture<EditsesionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsesionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
