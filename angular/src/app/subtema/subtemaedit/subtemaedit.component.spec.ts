import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemaeditComponent } from './subtemaedit.component';

describe('SubtemaeditComponent', () => {
  let component: SubtemaeditComponent;
  let fixture: ComponentFixture<SubtemaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtemaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtemaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
