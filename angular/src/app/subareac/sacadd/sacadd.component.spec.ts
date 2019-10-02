import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacaddComponent } from './sacadd.component';

describe('SacaddComponent', () => {
  let component: SacaddComponent;
  let fixture: ComponentFixture<SacaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
