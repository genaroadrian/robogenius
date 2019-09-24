import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeasisComponent } from './homeasis.component';

describe('HomeasisComponent', () => {
  let component: HomeasisComponent;
  let fixture: ComponentFixture<HomeasisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeasisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
