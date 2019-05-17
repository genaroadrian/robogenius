import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeraddComponent } from './peradd.component';

describe('PeraddComponent', () => {
  let component: PeraddComponent;
  let fixture: ComponentFixture<PeraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
