import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesmodalComponent } from './filesmodal.component';

describe('FilesmodalComponent', () => {
  let component: FilesmodalComponent;
  let fixture: ComponentFixture<FilesmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
