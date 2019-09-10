import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategComponent } from './updateg.component';

describe('UpdategComponent', () => {
  let component: UpdategComponent;
  let fixture: ComponentFixture<UpdategComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdategComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
