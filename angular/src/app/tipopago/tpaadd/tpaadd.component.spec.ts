import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaaddComponent } from './tpaadd.component';

describe('TpaaddComponent', () => {
  let component: TpaaddComponent;
  let fixture: ComponentFixture<TpaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
