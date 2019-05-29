import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhomeComponent } from './padhome.component';

describe('PadhomeComponent', () => {
  let component: PadhomeComponent;
  let fixture: ComponentFixture<PadhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
