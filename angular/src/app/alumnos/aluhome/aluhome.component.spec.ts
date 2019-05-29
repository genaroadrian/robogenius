import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluhomeComponent } from './aluhome.component';

describe('AluhomeComponent', () => {
  let component: AluhomeComponent;
  let fixture: ComponentFixture<AluhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
