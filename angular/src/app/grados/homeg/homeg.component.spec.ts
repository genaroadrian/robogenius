import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegComponent } from './homeg.component';

describe('HomegComponent', () => {
  let component: HomegComponent;
  let fixture: ComponentFixture<HomegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
