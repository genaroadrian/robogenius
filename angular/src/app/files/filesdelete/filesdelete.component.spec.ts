import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesdeleteComponent } from './filesdelete.component';

describe('FilesdeleteComponent', () => {
  let component: FilesdeleteComponent;
  let fixture: ComponentFixture<FilesdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
