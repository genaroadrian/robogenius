import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddeleteComponent } from './paddelete.component';

describe('PaddeleteComponent', () => {
  let component: PaddeleteComponent;
  let fixture: ComponentFixture<PaddeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
