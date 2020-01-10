import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulomembreciasComponent } from './modulomembrecias.component';

describe('ModulomembreciasComponent', () => {
  let component: ModulomembreciasComponent;
  let fixture: ComponentFixture<ModulomembreciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulomembreciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulomembreciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
