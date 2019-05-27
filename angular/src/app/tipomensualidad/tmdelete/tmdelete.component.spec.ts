import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdeleteComponent } from './tmdelete.component';

describe('TmdeleteComponent', () => {
  let component: TmdeleteComponent;
  let fixture: ComponentFixture<TmdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
