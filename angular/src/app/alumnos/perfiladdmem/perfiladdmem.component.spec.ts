import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiladdmemComponent } from './perfiladdmem.component';

describe('PerfiladdmemComponent', () => {
  let component: PerfiladdmemComponent;
  let fixture: ComponentFixture<PerfiladdmemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiladdmemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiladdmemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
