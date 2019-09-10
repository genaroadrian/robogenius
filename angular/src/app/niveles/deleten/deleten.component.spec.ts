import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletenComponent } from './deleten.component';

describe('DeletenComponent', () => {
  let component: DeletenComponent;
  let fixture: ComponentFixture<DeletenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
