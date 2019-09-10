import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoddeleteComponent } from './coddelete.component';

describe('CoddeleteComponent', () => {
  let component: CoddeleteComponent;
  let fixture: ComponentFixture<CoddeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoddeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoddeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
