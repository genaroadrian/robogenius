import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaeditComponent } from './areaedit.component';

describe('AreaeditComponent', () => {
  let component: AreaeditComponent;
  let fixture: ComponentFixture<AreaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
