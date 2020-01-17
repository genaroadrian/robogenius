import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhoraescComponent } from './addhoraesc.component';

describe('AddhoraescComponent', () => {
  let component: AddhoraescComponent;
  let fixture: ComponentFixture<AddhoraescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhoraescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhoraescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
