import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlueditComponent } from './aluedit.component';

describe('AlueditComponent', () => {
  let component: AlueditComponent;
  let fixture: ComponentFixture<AlueditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlueditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlueditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
