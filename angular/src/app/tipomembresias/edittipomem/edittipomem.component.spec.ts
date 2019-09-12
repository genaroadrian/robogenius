import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittipomemComponent } from './edittipomem.component';

describe('EdittipomemComponent', () => {
  let component: EdittipomemComponent;
  let fixture: ComponentFixture<EdittipomemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittipomemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittipomemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
