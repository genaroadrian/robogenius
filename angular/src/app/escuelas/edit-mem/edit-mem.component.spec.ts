import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemComponent } from './edit-mem.component';

describe('EditMemComponent', () => {
  let component: EditMemComponent;
  let fixture: ComponentFixture<EditMemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
