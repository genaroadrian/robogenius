import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SachomeComponent } from './sachome.component';

describe('SachomeComponent', () => {
  let component: SachomeComponent;
  let fixture: ComponentFixture<SachomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SachomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SachomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
