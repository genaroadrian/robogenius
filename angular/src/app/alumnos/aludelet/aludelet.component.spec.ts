import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AludeletComponent } from './aludelet.component';

describe('AludeletComponent', () => {
  let component: AludeletComponent;
  let fixture: ComponentFixture<AludeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AludeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AludeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
