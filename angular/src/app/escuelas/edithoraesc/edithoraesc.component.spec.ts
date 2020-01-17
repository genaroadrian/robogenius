import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithoraescComponent } from './edithoraesc.component';

describe('EdithoraescComponent', () => {
  let component: EdithoraescComponent;
  let fixture: ComponentFixture<EdithoraescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithoraescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithoraescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
