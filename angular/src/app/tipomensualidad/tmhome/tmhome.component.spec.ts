import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmhomeComponent } from './tmhome.component';

describe('TmhomeComponent', () => {
  let component: TmhomeComponent;
  let fixture: ComponentFixture<TmhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
