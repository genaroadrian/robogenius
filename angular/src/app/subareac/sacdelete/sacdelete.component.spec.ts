import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacdeleteComponent } from './sacdelete.component';

describe('SacdeleteComponent', () => {
  let component: SacdeleteComponent;
  let fixture: ComponentFixture<SacdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
