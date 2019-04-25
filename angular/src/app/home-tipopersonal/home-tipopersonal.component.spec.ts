import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTipopersonalComponent } from './home-tipopersonal.component';

describe('HomeTipopersonalComponent', () => {
  let component: HomeTipopersonalComponent;
  let fixture: ComponentFixture<HomeTipopersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTipopersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTipopersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
