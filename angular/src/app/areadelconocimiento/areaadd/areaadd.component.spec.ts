import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaaddComponent } from './areaadd.component';

describe('AreaaddComponent', () => {
  let component: AreaaddComponent;
  let fixture: ComponentFixture<AreaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
