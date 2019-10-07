import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletehComponent } from './deleteh.component';

describe('DeletehComponent', () => {
  let component: DeletehComponent;
  let fixture: ComponentFixture<DeletehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
