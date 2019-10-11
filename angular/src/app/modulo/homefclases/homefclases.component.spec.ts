import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomefclasesComponent } from './homefclases.component';

describe('HomefclasesComponent', () => {
  let component: HomefclasesComponent;
  let fixture: ComponentFixture<HomefclasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomefclasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomefclasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
