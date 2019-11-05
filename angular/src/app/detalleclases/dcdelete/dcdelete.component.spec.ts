import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcdeleteComponent } from './dcdelete.component';

describe('DcdeleteComponent', () => {
  let component: DcdeleteComponent;
  let fixture: ComponentFixture<DcdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
