import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdeleteComponent } from './hdelete.component';

describe('HdeleteComponent', () => {
  let component: HdeleteComponent;
  let fixture: ComponentFixture<HdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
