import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenivelComponent } from './updatenivel.component';

describe('UpdatenivelComponent', () => {
  let component: UpdatenivelComponent;
  let fixture: ComponentFixture<UpdatenivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatenivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
