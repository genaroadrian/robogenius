import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaaddComponent } from './temaadd.component';

describe('TemaaddComponent', () => {
  let component: TemaaddComponent;
  let fixture: ComponentFixture<TemaaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemaaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemaaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
