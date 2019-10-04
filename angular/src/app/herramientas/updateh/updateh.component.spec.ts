import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatehComponent } from './updateh.component';

describe('UpdatehComponent', () => {
  let component: UpdatehComponent;
  let fixture: ComponentFixture<UpdatehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
