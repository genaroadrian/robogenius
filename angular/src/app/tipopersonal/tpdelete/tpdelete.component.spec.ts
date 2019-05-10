import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpdeleteComponent } from './tpdelete.component';

describe('TpdeleteComponent', () => {
  let component: TpdeleteComponent;
  let fixture: ComponentFixture<TpdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
