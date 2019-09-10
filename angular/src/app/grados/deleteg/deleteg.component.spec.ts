import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletegComponent } from './deleteg.component';

describe('DeletegComponent', () => {
  let component: DeletegComponent;
  let fixture: ComponentFixture<DeletegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
