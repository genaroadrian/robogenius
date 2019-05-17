import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdeleteComponent } from './perdelete.component';

describe('PerdeleteComponent', () => {
  let component: PerdeleteComponent;
  let fixture: ComponentFixture<PerdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
