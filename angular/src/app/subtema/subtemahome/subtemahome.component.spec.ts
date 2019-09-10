import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemahomeComponent } from './subtemahome.component';

describe('SubtemahomeComponent', () => {
  let component: SubtemahomeComponent;
  let fixture: ComponentFixture<SubtemahomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtemahomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtemahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
