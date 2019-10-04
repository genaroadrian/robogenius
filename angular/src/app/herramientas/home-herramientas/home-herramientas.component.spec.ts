import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHerramientasComponent } from './home-herramientas.component';

describe('HomeHerramientasComponent', () => {
  let component: HomeHerramientasComponent;
  let fixture: ComponentFixture<HomeHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
