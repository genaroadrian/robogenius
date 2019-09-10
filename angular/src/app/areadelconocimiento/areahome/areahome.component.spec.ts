import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreahomeComponent } from './areahome.component';

describe('AreahomeComponent', () => {
  let component: AreahomeComponent;
  let fixture: ComponentFixture<AreahomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreahomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
