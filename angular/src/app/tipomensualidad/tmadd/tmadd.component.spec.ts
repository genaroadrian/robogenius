import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmaddComponent } from './tmadd.component';

describe('TmaddComponent', () => {
  let component: TmaddComponent;
  let fixture: ComponentFixture<TmaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
