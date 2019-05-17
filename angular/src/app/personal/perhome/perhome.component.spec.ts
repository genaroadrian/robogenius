import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhomeComponent } from './perhome.component';

describe('PerhomeComponent', () => {
  let component: PerhomeComponent;
  let fixture: ComponentFixture<PerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
