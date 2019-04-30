import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEscuelasComponent } from './home-escuelas.component';

describe('HomeEscuelasComponent', () => {
  let component: HomeEscuelasComponent;
  let fixture: ComponentFixture<HomeEscuelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEscuelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
