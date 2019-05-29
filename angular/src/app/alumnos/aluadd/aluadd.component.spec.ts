import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluaddComponent } from './aluadd.component';

describe('AluaddComponent', () => {
  let component: AluaddComponent;
  let fixture: ComponentFixture<AluaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
