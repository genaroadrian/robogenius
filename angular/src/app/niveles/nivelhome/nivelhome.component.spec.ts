import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelhomeComponent } from './nivelhome.component';

describe('NivelhomeComponent', () => {
  let component: NivelhomeComponent;
  let fixture: ComponentFixture<NivelhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
