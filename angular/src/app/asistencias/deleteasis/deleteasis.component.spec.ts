import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteasisComponent } from './deleteasis.component';

describe('DeleteasisComponent', () => {
  let component: DeleteasisComponent;
  let fixture: ComponentFixture<DeleteasisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteasisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
