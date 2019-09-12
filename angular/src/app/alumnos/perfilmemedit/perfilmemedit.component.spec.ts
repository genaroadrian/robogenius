import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilmemeditComponent } from './perfilmemedit.component';

describe('PerfilmemeditComponent', () => {
  let component: PerfilmemeditComponent;
  let fixture: ComponentFixture<PerfilmemeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilmemeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilmemeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
