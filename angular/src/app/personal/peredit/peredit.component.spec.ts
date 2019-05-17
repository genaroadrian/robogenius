import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PereditComponent } from './peredit.component';

describe('PereditComponent', () => {
  let component: PereditComponent;
  let fixture: ComponentFixture<PereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
